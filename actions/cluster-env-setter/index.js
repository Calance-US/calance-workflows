const core = require('@actions/core')

try {
  const dockerJsonMetadata = core.getInput('docker_json_metadata')
  const dockerMetadata = JSON.parse(dockerJsonMetadata)

  const imageTag = dockerMetadata.labels['org.opencontainers.image.version']

  const repository =  dockerMetadata.labels['org.opencontainers.image.source']

  if (!imageTag || typeof imageTag !== 'string') {
    throw new Error('Unable to get image version from metadata.')
  }

  const isProduction = imageTag.match(/^\d+\.\d+\.\d+$/) || (imageTag === "main")

  const isTesting = imageTag.match(/^\d+\.\d+\.\d+-rc\d+$/)

  if (isProduction) {
    core.setOutput('cluster_environment', 'production')
  } 
  else if(isTesting){
    core.setOutput('cluster_environment', 'testing')
  }
  // for money-quiz dev environment
  else if (repository.includes('money-quiz')) {
    core.setOutput('cluster_environment','dev')
  } else {
    throw new Error('Invalid image tag')
  }

} catch (error) {
  core.setFailed(error.message)
}
