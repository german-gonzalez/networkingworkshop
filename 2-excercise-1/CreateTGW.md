# Create a Transit Gateway

> [!TIP]
> You will create a TGW to interconnect VPCs. Always keep in mind to modify the respective Route Tables. 

## 1. Create an Transit Gateway

* Follow [this deep link to create an IAM role with Administrator access](https://console.aws.amazon.com/iam/home#/roles$new?step=review&commonUseCase=EC2%2BEC2&selectedUseCase=EC2&policies=arn:aws:iam::aws:policy%2FAdministratorAccess)
* Confirm that AWS service and EC2 are selected, then click Next to view permissions.
* Confirm that AdministratorAccess is checked, then click Next to Tags.
* Just click Next to review.
* Enter mskworkshop-admin for the Name, and select Create Role

