import shlex, subprocess

print("""
Deployment script to AWS
S3 Bucket: especiales.datasketch.co
""")

dirname = str(input("Folder name: ")).strip()
prod = str(input("Production folder (optional): ")).strip()


if not prod:
	cli = 's3cmd sync --no-mime-magic --guess-mime-type {} s3://especiales.datasketch.co'.format(dirname)
elif prod:
	cli = 's3cmd sync --no-mime-magic --guess-mime-type {}/{}/ s3://especiales.datasketch.co/{}/'.format(dirname, prod, dirname)

args = shlex.split(cli)
print(args)

subprocess.call(args)