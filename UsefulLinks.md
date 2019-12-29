### Installing the plug-in if you want to use from the command line

Instead of using the browser to connect to each session, its possible to do so straight from the command line. However, you will need the plug-in installed first, which can be found here.

 https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-install-plugin.html

 Please note you need to be running v1.16.12 or later of the AWS CLI. You can check this with the command

    aws --version

### Getting a list of managed instances and IP addresses, and connecting to them

If you want to easily get a list of managed instances from the command line, you can use the command

    aws ssm describe-instance-information | egrep 'InstanceId|IPAddress'

This will generate a list of the instance-ID and the IP address associated with it. That way, you can easily select the correct instance ID when connecting to it. 

Once you have your ID, then you connect to it using the command

    aws ssm start-session --target <instanceID>

remembering that you need to have configured the correct profile and region within `aws configure`.

If you don't want to change your default profile and region for the shell you are in, then you will need to do that within the command, using 

    aws ssm start-session --profile <profile> --region <region> --target <instanceID>

### Changing your shell session prompt

If you are connecting to a shell, and want to easily see the IP address of the instance you are connected to, and have multiple shells open on the page, then you can change the instance prompt to show the IP address, as follows

    export NICKNAME=<nickname>
    export MYIP=$(ifconfig | grep inet | egrep -v "127.0.0.1|inet6" | awk '{print $2}')
    export PS1='[$NICKNAME : $MYIP] \$ '

For example, if the nickname you set is `foobar` and the ip address of the instance is 192.168.1.100, then this will change the prompt to

    foobar : 192.168.1.100 $ 

