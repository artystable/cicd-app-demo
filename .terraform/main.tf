
## This is the main Terraform config file that is used to build our infractstructure.

variable "AWS_ACCESS_KEY" {}
variable "AWS_SECRET_ACCESS_KEY" {}
variable "AWS_DEFAULT_REGION" {}
variable "S3_BUCKET_NAME" {}
variable "PRINCIPAL_AWS_RESOURCE_ARN" {}

provider "aws" {
    access_key = "${var.AWS_ACCESS_KEY}"
    secret_key = "${var.AWS_SECRET_ACCESS_KEY}"
    region = "${var.AWS_DEFAULT_REGION}"
}

resource "aws_s3_bucket" "selected" {
  bucket = "${var.S3_BUCKET_NAME}"
  acl    = "public-read"
  policy = <<EOF
{
  "Version":"2012-10-17",
  "Statement":[{
    "Sid":"",
    "Action":["s3:GetObject"],
    "Effect":"Allow",
    "Resource":"arn:aws:s3:::${var.S3_BUCKET_NAME}/*",
    "Principal": {
      "AWS": "${var.PRINCIPAL_AWS_RESOURCE_ARN}"
    }
  }]
}
EOF

  website {
    index_document = "index.html"
    error_document = "error.html"
  }

  force_destroy = true
}
