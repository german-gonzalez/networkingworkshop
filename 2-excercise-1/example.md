# Attach VPCs

> [!DANGER]
> This is an alert for the users. This is an alert for the users. This is an alert for the users. This is an alert for the users. 

## 1. Create your Cloud9 environment

Choose the region 

<!-- tabs:start -->
#### ** Virginia USA**
Create a Cloud9 Environment using the console https://eu-west-1.console.aws.amazon.com/cloud9/home?region=us-east-1
#### ** Ireland **
Create a Cloud9 Environment using the console https://eu-west-1.console.aws.amazon.com/cloud9/home?region=eu-west-1
<!-- tabs:end -->

* Select **Create environment**
* Name it **mskworkshop**, and take all other defaults
* When it comes up, customize the environment by closing the welcome tab and lower work area, and opening a new terminal tab in the main work area:

## 2. Second section of this tutorial

Some text here and a code sample below

```bash
sudo yum -y install jq gettext
```

# Create a Transit Gateway

> [!TIP]
> You will create a TGW to interconnect VPCs. Always keep in mind to modify the respective Route Tables. 

## 1. Create an Transit Gateway

* Follow [this deep link to create an IAM role with Administrator access](https://console.aws.amazon.com/iam/home#/roles$new?step=review&commonUseCase=EC2%2BEC2&selectedUseCase=EC2&policies=arn:aws:iam::aws:policy%2FAdministratorAccess)
* Confirm that AWS service and EC2 are selected, then click Next to view permissions.
* Confirm that AdministratorAccess is checked, then click Next to Tags.
* Just click Next to review.
* Enter mskworkshop-admin for the Name, and select Create Role


