const core = require('@actions/core')

try {
  const dockerJsonMetadata = core.getInput('docker_json_metadata')
  const dockerMetadata = JSON.parse(dockerJsonMetadata)

  const imageVersion = dockerMetadata.labels['org.opencontainers.image.version']

  if (!imageVersion || typeof imageVersion !== 'string') {
    throw new Error('Unable to get image version from metadata.')
  }

  const isProduction = imageVersion.match(/^v\d+\.\d+\.\d+(-rc\d+)?$/)
  const isTesting = imageVersion.match(/^v\d+\.\d+\.\d+-rc\d+$/)

  if (isProduction) {
    core.setOutput('cluster_environment', 'production')
  } else if (isTesting) {
    core.setOutput('cluster_environment', 'testing')
  } else {
    throw new Error('Invalid image version provided.')
  }
} catch (error) {
  core.setFailed(error.message)
}
