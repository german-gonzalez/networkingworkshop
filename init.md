# Networking Workshop

This workshop is intended to deploy the following items during the 5 labs

- Transit Gateway in a single region and account
- Adding an additional VPC, from a different account
- Using route tables to isolate traffic
- Extending the transit gateway to a different region
- Mirroring traffic to monitor what is going through the NAT instance

As such, the final architecture will look like this

![image](_media/architecture.png)

This workshop is intended to be run in conjunction with presentation slides, as multiple modules.

Also, at the beginning of each module, there will be a level of setting up needed that uses a cloudformation script to create the environment. Please make sure you are able to launch cloudformation scripts in your account, and if it is a brand new account, be aware that it may take 30 minutes or so for this function to become active.

