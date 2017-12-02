import shlex, subprocess

print("""
Deployment script to AWS
S3 Bucket: especiales.datasketch.co
""")

dirname = raw_input("Folder name: ")
cli = 's3cmd sync --no-mime-magic --guess-mime-type {} s3://especiales.datasketch.co'.format(dirname)
args = shlex.split(cli)

subprocess.call(args)