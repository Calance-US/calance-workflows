const core = require('@actions/core');

try {
  const dockerJsonMetadata = core.getInput('docker_json_metadata');
  const dockerMetadata = JSON.parse(dockerJsonMetadata);

  const imageVersion = dockerMetadata.labels['org.opencontainers.image.version'];

  if(!imageVersion || typeof imageVersion !== 'string') {
    throw new Error('Unable to get image version from metadata')
  }

  const isTesting = imageVersion.match(/.*-rc[0-9]/);

  if(isTesting !== null) {
    core.setOutput('cluster_environment', 'testing')
  } else {
    core.setOutput('cluster_environment', 'production')
  }
} catch (error) {
  core.setFailed(error.message);
}
