# ACCOUNT LEVEL DASHBOARD 

Dashboard relying on Incapsula APIs to view settings of all sites of an account in a clear and actionable dashboard.  
Instant view of settings of all sites and account level statistics  
  
The Account level dashboard includes:  
- table with all main settings assessment (Security and Performance) exportable to xls
- Convenient dashboard showing in a clear way the settings status with export to pdf
- Bulk actions to perform security settings changes to several sites at once



# Installation & Usage
## Versions 
There are 2 versions of this project under 2 different branches
This is the project that relies on php, and not maintained anymore. 

## HOW TO: Install using Xampp (local virtual web server)
1- download Xampp tool and check that Apache is started on it  
2- copy this code in C:\xampp\htdocs folder on another htdocs subfolder  
3- Browse to localhost\subdomainNameYouGave  
You should see the dashboard !  


## HOW TO DEPLOY: Install using Docker
0- Download Docker on your mac (or PC)  
1- Build it:  
•	Create a new directory and place the Dockerfile inside the directory that you just created  
•	Run the following command from the directory that hold the Dockerfile  
•	you can replace dashboard:latest to another tag and value(version)  
#docker build –t dashboard:latest .  
2- Run it:  
- In order to run and use the dashboard you need to perform port mapping between your external available port to the expose port inside the dockerfile (which is 80 in our dockerfile case)  
#docker run –dti -p 8080:80 dashboard:latest  
3- Use it:  
Browse to 127.0.0.1:8080  

it is recommended to login with the API keys of the account admin to benefit from all the account information

## HOW TO DEPLOY: Deploy as a web server
deploy as any html web server under Apache or Ngninx

# Screenshots
  
Login Page with API keys  
![alt text](https://raw.githubusercontent.com/imperva/account-level-dashboard/master/images/screenshots/login.png)  
  
Main Dashboard Page  
![alt text](https://github.com/imperva/account-level-dashboard/raw/master/images/screenshots/main%20screen.png)  
  
Security Settings table, per site, exportable in pdf and excel  
![alt text](https://github.com/imperva/account-level-dashboard/raw/master/images/screenshots/security%20assessment%20table.png)  

Bulk Actions Changes to multiple sites at once
![alt text](https://github.com/imperva/account-level-dashboard/blob/master/images/screenshots/bulk%20actions.png) 

## Errors
If you are getting an error that says "Issue with the API Key or Account Permission", make sure that:  
1- The API is properly running on Incapsula API explorer page to confirm it is not a permissions issue  

## Reporting Bugs
please reports bugs, issues or suggestions for improvement in the following page:  
https://github.com/imperva/account-level-dashboard/issues

## Contributions  
- reach out to me for suggestion or if you want to contribute: jonathan.gruber@imperva.com  
- If you want to participate to the project, you can create your own branch and ping me to suggest merges to the master branch
