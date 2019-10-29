## This is the main Terraform config file that is used to build our infractstructure.

variable "REGION" {}
variable "ACCESS_KEY" {}
variable "SECRET_KEY" {}
variable "S3_BUCKET_NAME" {}
variable "PRINCIPAL_AWS_RESOURCE_ARN" {}

provider "aws" {
    access_key = "${var.ACCESS_KEY}"
    secret_key = "${var.SECRET_KEY}"
    region = "${var.REGION}"
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
}
