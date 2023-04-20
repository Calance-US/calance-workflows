const core = require('@actions/core')

try {
  const dockerJsonMetadata = core.getInput('docker_json_metadata')
  const dockerMetadata = JSON.parse(dockerJsonMetadata)

  const imageTag = dockerMetadata.labels['org.opencontainers.image.version']

  if (!imageTag || typeof imageTag !== 'string') {
    throw new Error('Unable to get image version from metadata.')
  }

  const isProduction = imageTag.match(/^\d+\.\d+\.\d+$/) || (imageTag === "main")

  if (isProduction) {
    core.setOutput('cluster_environment', 'production')
  } else {
    core.setOutput('cluster_environment', 'testing')
  }
} catch (error) {
  core.setFailed(error.message)
}
