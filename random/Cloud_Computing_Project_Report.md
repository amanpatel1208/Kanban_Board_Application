# SERVERLESS DEPLOYMENT OF A WEB APPLICATION USING AWS S3

**A PROJECT REPORT**

Submitted by

**Aman Patel (23BCS11665)**
**Vardan Agarwal (23BCS11966)**
**Sarthak Kumar Saini (23BCS11582)**

in partial fulfillment for the award of the degree of

**BACHELOR OF ENGINEERIN**
IN
**COMPUTER SCIENCE AND ENGINEERING**

Course: Cloud Computing

**Chandigarh University**
**April 2026**

---

## BONAFIDE CERTIFICATE

Certified that this project report **"Serverless Deployment of a Web Application using AWS S3"** is the bonafide work of **"Aman Patel (23BCS11665), Vardan Agarwal (23BCS11966), and Sarthak Kumar Saini (23BCS11582)"** who carried out the project work under my/our supervision.

| SIGNATURE | SIGNATURE |
| :--- | :--- |
| **Gagandeep Singh** | **Ms. Alka Jaswal** |
| HEAD OF THE DEPARTMENT | SUPERVISOR |
| Dept. of CSE, Chandigarh University | Assistant Professor, Dept. of CSE |

Submitted for the project viva-voce examination held on _______________

---

## ACKNOWLEDGEMENT

We express our sincere gratitude to **Ms. Alka Jaswal**, our project supervisor, for her constant guidance and support throughout the course of this project.

We also thank Prof. Gagandeep Singh, Head of the Department of Computer Science and Engineering, Chandigarh University, for providing a supportive academic environment.

Finally, we thank our family and friends for their encouragement throughout this work.

- Aman Patel
- Vardan Agarwal
- Sarthak Kumar Saini

---

## TABLE OF CONTENTS

1. [CHAPTER 1: INTRODUCTION](#chapter-1-introduction)
2. [CHAPTER 2: ARCHITECTURE AND DESIGN](#chapter-2-architecture-and-design)
3. [CHAPTER 3: IMPLEMENTATION AND VALIDATION](#chapter-3-implementation-and-validation)
4. [CHAPTER 4: CONCLUSION AND FUTURE WORK](#chapter-4-conclusion-and-future-work)
5. [REFERENCES](#references)
6. [APPENDIX: DEPLOYMENT MANUAL](#appendix-deployment-manual)

---

## CHAPTER 1
### INTRODUCTION

#### 1.1 Overview
The era of traditional web hosting requiring dedicated servers is evolving. Cloud computing introduces serverless architectures that offer high availability, infinite scalability, and reduced costs. This project demonstrates the deployment of a modern web application (a Trello Clone frontend) using AWS S3 Static Website Hosting. 

#### 1.2 Objective
The primary objective of this project is to successfully host a static web application on the cloud without provisioning or managing any virtual servers (EC2 instances). 

#### 1.3 Scope
The scope covers creating an AWS S3 bucket, configuring it for public website hosting, uploading static assets (HTML, CSS, JavaScript), and defining appropriate IAM bucket policies to make the application globally accessible.

---

## CHAPTER 2
### ARCHITECTURE AND DESIGN

#### 2.1 Design Constraints
- **Economic Constraint:** The solution must be highly cost-effective, leveraging AWS Free Tier where possible.
- **Maintenance Constraint:** The architecture should require zero server maintenance/patching (Serverless paradigm).

#### 2.2 Alternative Designs
**Alternative 1: Traditional EC2 Hosting**
Deploying an EC2 virtual machine, installing Nginx/Apache, and hosting the files.
- *Pros:* Complete control over the OS and web server.
- *Cons:* Overkill for static files, requires OS patching, lacks automatic high availability.

**Alternative 2: AWS S3 Static Website Hosting (Selected)**
Uploading static assets directly to an S3 bucket configured for web hosting.
- *Pros:* Zero maintenance, scales infinitely, extremely cost-effective.
- *Cons:* Only supports static files (HTML/CSS/JS)—backend logic must be handled via APIs.

#### 2.3 Selected Architecture Implementation Plan
1. **S3 Bucket Creation:** Provision an S3 bucket with a globally unique name.
2. **Access Configuration:** Unblock public access settings.
3. **Bucket Policy:** Attach a JSON policy to allow `s3:GetObject` on all bucket assets.
4. **Asset Upload:** Upload the frontend folder of the project.
5. **Endpoint Generation:** Retrieve the S3 website endpoint URL for public access.

---

## CHAPTER 3
### IMPLEMENTATION AND VALIDATION

#### 3.1 Tools and Platforms Used
- **Cloud Provider:** Amazon Web Services (AWS)
- **Service:** Amazon Simple Storage Service (S3)
- **Application Stack:** HTML5, CSS3, Vanilla JavaScript 

#### 3.2 The Deployment Method
The web application leverages the S3 Static Website feature. Unlike standard storage, enabling this specific feature prompts Amazon S3 to serve index documents (`index.html`) correctly when root or sub-directory URLs are accessed, and return correct HTTP 404/500 errors.

To allow web browsers to read the files, the following Bucket Policy was formulated and applied:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::<your-bucket-name>/*"
        }
    ]
}
```

#### 3.3 Testing and Validation
The deployment was validated by navigating to the S3-generated regional endpoint: 
`http://<bucket-name>.s3-website-<region>.amazonaws.com`

**Validation Metrics:**
- **Availability:** The application loads successfully over the public internet.
- **Asset Rendering:** External style sheets and local JavaScript functionality (Kanban board drag-and-drop) execute correctly in the client's browser without CORS errors.

---

## CHAPTER 4
### CONCLUSION AND FUTURE WORK

#### 4.1 Conclusion
This project successfully achieved a serverless deployment of a web application using AWS S3. By adhering to cloud computing best practices, we eliminated the need to manage underlying server infrastructure. The project proves that S3 is an optimal solution for hosting static web applications, delivering high global availability at a very low operational cost.

#### 4.2 Future Work
- **CDN Integration:** Integrate AWS CloudFront to cache the website content globally, decreasing latency.
- **Custom Domain Registration:** Map a custom domain (e.g., `www.mytrelloclone.com`) to the S3 bucket using AWS Route 53.
- **CI/CD Pipeline:** Implement GitHub Actions to automatically upload new code changes to the S3 bucket on every code commit.

---

## REFERENCES
1. Amazon Web Services (2024) 'Hosting a static website using Amazon S3'. Available at: https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html
2. Amazon Web Services (2024) 'Bucket policies for Amazon S3'. Available at: https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-policies.html
3. Varia, J. and Mathew, S. (2014) 'Overview of Amazon Web Services', AWS Whitepapers.

---

## APPENDIX
### DEPLOYMENT MANUAL

**Complete step-by-step instructions to deploy this application.**

**Step 1: Create the S3 Bucket**
1. Log into the AWS Management Console.
2. Navigate to **S3** and click **Create bucket**.
3. Provide a unique bucket name and select your AWS Region.
4. Under "Object Ownership", leave ACLs disabled.
5. Under "Block Public Access settings", uncheck **Block all public access** and acknowledge the warning.
6. Click **Create bucket**.

**Step 2: Enable Static Website Hosting**
1. Click on your newly created bucket.
2. Go to the **Properties** tab.
3. Scroll to the bottom to **Static website hosting** and click **Edit**.
4. Select **Enable**.
5. Set the Index document to `index.html`.
6. Click **Save changes**.

**Step 3: Update Bucket Policy**
1. Go to the **Permissions** tab of your bucket.
2. Under **Bucket policy**, click **Edit**.
3. Paste the specific JSON policy that grants `s3:GetObject` permission to all users (`*`). Make sure to replace the `<your-bucket-name>` placeholder with the actual bucket name.
4. Click **Save changes**.

**Step 4: Upload Application Files**
1. Go to the **Objects** tab.
2. Click **Upload** -> **Add files / Add folder**.
3. Select your `index.html` and other application folders. 
4. Click **Upload**.

**Step 5: View the Live Application**
1. Go back to the **Properties** tab.
2. Scroll down to **Static website hosting** and click the **Bucket website endpoint** URL. Your application is now live on the cloud!
