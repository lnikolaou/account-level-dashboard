ACCOUNT LEVEL DASHBOARD
Dashboard relying on Incapsula APIs to view settings of all sites of an account in a clear and actionable dashboard.
Instant view of settings of all sites and account level statistics

The Account level dashboard includes:
- table with all main settings assessment (Security and Performance)
- Convenient dashboard showing in a clear way the settings status

CONTRIBUTIONS
- reach out to me for suggestion or if you want to contribute: jonathan.gruber@imperva.com
- You can create your own branch and ping me to suggest merges to the master branch


HOW TO: USE LOCALLY ON YOUR PC/MAC MACHINE
1- download Xampp tool and check that Apache is started on it
2- copy this code in C:\xampp\htdocs folder on another htdocs subfolder
3- Browse to localhost\subdomainNameYouGave
You should see the dashboard !


HOW TO: INSTALL THIS ON A LINUX MACHINE
Using CentOS (commands may vary slightly on other distributions):
1	cd to your apache document directory, typically /var/www/html/
	cd /var/www/html/
2	Install git, if you do not have it installed:
	yum install git
3	git clone https://github.com/imperva/account-level-dashboard.git
4	chown +r apache:apache ./account-level-dashboard  (use the user and group from your web server config file)


HOW TO: INSTALL THIS WITH DOCKER
Build it:
•	Create a new directory and place the Dockerfile inside the directory that you just created
•	Run the following command from the directory that hold the Dockerfile
#docker build .
You can add tag value to the image with the following command
#docker build –t <tag>:<value>

Run it:
- In order to run and use the dashboard you need to perform port mapping between your external available port to the expose port inside the dockerfile (which is 80 in our dockerfile case)
# docker run –dti -p 80:80 tag:value
Use it:
Browse to 127.0.0.1


AFTER INSTALL
Enter the Account Admin APIs (stats could be missing with other API permissions)

CARE:
if you get an error after running the dashboard on an account with many sites (>50), try to select 7-days timeframe when checking the per-site box. Also, if you get a php timeout, due to large account, you can increase the value of max_execution_time in php.ini file
