const core = require('@actions/core');
// const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {
  const bucket = core.getInput('bucket', { required: true });
  const region = core.getInput('bucket-region', { required: true });
  const folder = core.getInput('dist-folder', { required: true });
  
  const s3Uri = `s3://${bucket}`;
  exec.exec(`aws s3 sync ${folder} ${s3Uri} --region ${region}`);
  
  const websiteUrl = `http://${bucket}.s3-website.${region}.amazonaws.com/`
  core.setOutput('website-url', websiteUrl);
}

run();