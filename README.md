# *Reusable Workflows Repository:* Streamlining CI/CD Processes
# :black_nib: Introduction

*This repository houses reusable workflows for CI/CD pipelines. Below, you'll find detailed information on how to use these workflows effectively.*

# :earth_asia: Content
- [Workflows Mechanism](#workflows-mechanism)
- [Requirements and Dependencies](#requirements-and-dependencies)
- [Environment Variables](#environment-variables)
- [Parameters](#parameters)
- [Examples](#examples)
- [Contributor/s](#contributors)

## :runner: Workflows Mechanism
![CI/CD_workflow](images/CI_CD_workflow_diagram.png)

## :baby: Requirements and Dependencies

* Jenkins
* Node/Cloud configured on Jenkins (For configuring the node/cloud on Jenkins, check [here](www.google.com))

## :cyclone: Required Environment Variables

*For applications getting deployed on Kubernetes Clusters:*

| Variable | Description |
| --- | --- |
| JENKINS_URL   |  URL of Jenkins Server |
| JENKINS_USER   |  Authorized User for accessing Jenkins Server   |
| JENKINS_TOKEN   | Token for accessing Jenkins Server   |
| SMTP_PASSWORD   |    SMTP Server Password for Notifying about pipelines | 


*For applications getting deployed on AWS EC2 Instances:*

| Variable | Description |
| --- | --- |
| JENKINS_URL   |  URL of Jenkins Server |
| JENKINS_USER   |  Authorized User for accessing Jenkins Server   |
| JENKINS_TOKEN   | Token for accessing Jenkins Server   |
| SMTP_PASSWORD   |    SMTP Server Password for Notifying about pipelines |
| AWS_ACCESS_KEY_ID | AWS Access Key for the User for accessing the instance | 
| AWS_SECRET_ACCESS_KEY  | AWS Secret Key for the User for accessing the instance |

## :eyes: Parameters

*For applications getting deployed on Kubernetes Clusters:*

| Parameter | Description | Required | Default Value |
| --- | --- | --- | --- |
| repository_name   |  Name of the repository | True | - |
| image_name | Name of the docker image | True | - |
|release_name | Application release name | False | ${{ github.event.repository.name }} |
|service_name | Application service name | False | ${{ github.event.repository.name }} |
|cluster_environment | Environment to deploy the image | True | - |
| version | Version of the application | True | - |
| commit_id | Latest commit sha of the build | True | - |
| env_specific_namespaces | Enable generating namespace value according to the cluster-environment | False | false |
| image_registry | Name of image registry | True | - |
jenkins_job_name | Name of Jenkins job name | True | - |
| workflows_release | Workflows Release Version of current deployment | True | - |
| helm_values_repository | Name of repository that has helm values files | True | - |
| codeowners_email_ids | Email-ID of CodeOwner/s (If multiple codeowners, seperate email ids with comma) | True | - |
  
*For applications getting deployed on AWS EC2 Instances:*

| Parameter | Description | Required | Default Value |
| --- | --- | --- | --- |
| image_name | Name of the docker image | True | - |
|release_name | Application release name | True | - |
|service_name | Application service name | False | ${{ github.event.repository.name }} |
|cluster_environment | Environment to deploy the image | True | - |
| version | Version of the application | True | - |
| image_registry | Name of image registry | True | - |
jenkins_job_name | Name of Jenkins job name | True | - |
| workflows_release | Workflows Release Version of current deployment | True | - |
| codeowners_email_ids | Email-ID of CodeOwner/s (If multiple codeowners, seperate email ids with comma) | True | - |
| credentials_id | Credentials ID for pulling image from Image Registry defined in Jenkins Credentials Store | True | - |
| command | Command for starting the application | False | - |
| port | Port at which service will be running | False | - |
| aws_region | AWS region name | False | - |
| docker_network | Name of docker network | True | - |
| mount_path | Mount Path (For multiple volume mounts, add a comma seperated string) | False | - |
| enable_gpu | Enable if container requires GPU | False | - |
| log_driver | Logging Driver of Container | False | - |
| log_driver_options | Log Driver Options (For multiple log driver options, add a comma seperated string) | False | - |

## :mag_right: Examples
## :information_desk_person: Contributors

Want to reach out to the folks who have tirelessly worked on this project, please reach out to the following folks.

*The entire purpose of the workflow is to build jenkins job from GitHub action, for this we have used GoldenspearLLC/build-jenkins-job which is created by [GoldenSpear](https://github.com/GoldenspearLLC/build-jenkins-job)*

**Project Manager/s:**

- [Arpit Goyal](https://github.com/agoyalcalance)

**Developer/s:**

- [Prem Pratap Singh](https://github.com/ppsinghcalance)
- [Nilesh Mathur](https://github.com/nmathur478)
