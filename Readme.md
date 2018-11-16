ACCOUNT LEVEL DASHBOARD

Dashboard initiative is meant to provide some level of visibility at account level
Today Incapsula dashboard provides a site by site view
The Account level dashboard includes:
- table with all main settings assessment (Security and Performance)
- Convenient dashboard showing in a clear way the settings status (how many are still on Alert, some performance and traffic graphs...)

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
3	git clone https://gitlab.com/imperva-community/public/tools/incapsula-security-assessment.git
4	chown –r apache:apache ./incapsula-security-assessment  (use the user and group from your web server config file)

5	If you’re running selinux, you may also need:
	semanage fcontext -a -t http_sys_content_t "/var/www/html/incapsula-security-assessment(/.*)?"
	restorecon –Rv /var/www/html/Incapsula-security-assessment/

AFTER INSTALL
Enter the Account Admin APIs (stats could be missing with other API permissions)

CARE:
if you get an error after running the dashboard on an account with many sites (>50), try to select 7-days timeframe when checking the per-site box.
Also, if you get a php timeout, due to large account, you can increase the value of max_execution_time in php.ini file





