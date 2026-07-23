# Project Explanation

## 1. How Our Application Uses AWS S3

Traditionally, AWS S3 is just **Object Storage** (like a giant cloud hard drive used for storing backups or images). However, we are using a specific feature called **S3 Static Website Hosting**. 

Here is how it works:
* We compiled our React/Vite frontend into pure static assets (`index.html`, `CSS`, and pure `JavaScript`).
* We uploaded these files into an S3 Bucket and enabled the **Static Website Hosting** property.
* We attached a **Bucket Policy** (`s3:GetObject`) that allows public read access to those files.
* When a user visits the S3 Endpoint URL, the S3 bucket acts exactly like a lightweight Web Server. It immediately serves the `index.html` file to the user's browser without needing any backend compute instances (like an EC2 Linux server). 
* The browser downloads the files and executes the React application locally.

**Why this is good:** It costs almost `$0.00` since there is no server running 24/7, and AWS guarantees 99.99% uptime because S3 data is automatically duplicated across multiple Availability Zones.

---

## 2. Why Our AWS EC2 Backend Did Not Connect

When we tried to connect our deployed S3 Frontend to our deployed AWS EC2 Backend, the connection failed due to two fundamental Cloud Cloud architecture barriers:

**A. Inbound Firewall Rules (AWS Security Groups)**
When you spin up an EC2 instance, AWS places a strict virtual firewall around it called a Security Group. By default, it aggressively denies all incoming external traffic. Because our custom API was running on `Port 5001` (rather than standard Ports 80/443), the AWS Firewall blocked the network request before it even reached the Node server, causing a `Connection Timed Out` error.

**B. CORS (Cross-Origin Resource Sharing) Enforcement**
Even if the firewall port was open, the connection would still be blocked by **CORS**. Browsers strictly restrict cross-origin HTTP requests. 
When our frontend (hosted on `http://aman-trello-project-2026.s3-website.ap-south-1.amazonaws.com`) tried to request data from the backend (hosted on `13.61.24.120`), the Node.js backend referenced its allowed origins list. Because the backend was code-frozen and deployed earlier, its `.env` file did not have the *new* S3 URL whitelisted. Consequently, the backend rejected the request.
