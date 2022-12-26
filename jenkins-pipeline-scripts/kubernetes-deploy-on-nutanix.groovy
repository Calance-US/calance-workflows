def imageName = ""
def cleanedReleaseName = ""

node("master") {
    stage("Identify Cluster for deployment") {
        configFileProvider([
            configFile(fileId: "service-cluster-configuration.json", variable: 'CONFIG_FILE')
        ]) {
            def data = readJSON file: "$CONFIG_FILE"
            cloudName = data["$SERVICE_NAME-$CLUSTER_ENVIRONMENT"]

            if (cloudName == null || cloudName == "") {
                error "Cluster config does not exist for $SERVICE_NAME-$CLUSTER_ENVIRONMENT"
            }

            print "For application - $SERVICE_NAME, environment - $CLUSTER_ENVIRONMENT, Chosen cloud - $cloudName"
            
            // IMAGE_NAME param was added later, so for old workflows
            // to work we get image name from SERVICE_NAME param
            imageName = IMAGE_NAME
            if (imageName == null || imageName == "") {
                imageName = SERVICE_NAME
            }
            print "Image Name -> $imageName"
            
            // RELEASE_NAME param was added later, so for old workflows
            // to work we get release name from IMAGE_NAME or SERVICE_NAME params
            def releaseName = RELEASE_NAME
            if (releaseName == null || releaseName == "") {
                releaseName = IMAGE_NAME
            }
            if (releaseName == null || releaseName == "") {
                releaseName = SERVICE_NAME
            }
            // helm release names can contain only alphanumeric and hyphen characters
            cleanedReleaseName = releaseName.toLowerCase().replaceAll("[-_\\s]+","-").replaceAll("[^a-z0-9-]", "")
            print "Release Name -> $cleanedReleaseName"
        }
    }
}
node("$cloudName") {
    container('helm') {
        stage("Logging into registry") {
            sh '''
                set +x
                helm registry login -u $GITHUB_USERNAME -p $GITHUB_PASSWORD ghcr.io
                set -x
            '''
        }

        stage("Deploying application") {
            def valuesFilename = "${cleanedReleaseName}-${CLUSTER_ENVIRONMENT}"
            print "For release $cleanedReleaseName, picking values from config file - $valuesFilename"

            configFileProvider([
                configFile(fileId: "$valuesFilename", variable: 'VALUES_FILE')
            ]) {
                sh("helm upgrade --install --namespace ${NAMESPACE} --create-namespace ${cleanedReleaseName} --set image.tag=${VERSION} --set image.repository=ghcr.io/calance-us/${imageName} -f $VALUES_FILE oci://ghcr.io/calance-us/calance-services --version 1.7")
            }
        }
    }
}

