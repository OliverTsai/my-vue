server{
	listen 80;
	listen [::]:80;

	root /var/www/firsports.com/html;
	index index.html index.htm index.nginx-debian.html;

	server_name firsports.com www.firsports.com;

	location / {
			try_files $uri $uri/ =404;
	}
}
