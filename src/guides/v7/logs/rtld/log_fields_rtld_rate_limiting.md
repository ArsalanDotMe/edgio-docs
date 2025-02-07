---
title: Log Fields (RTLD Rate Limiting)
---

Log data is reported as a JSON document. Log format determines whether log data identification information will be included and how the data is formatted. Each type of log format is described below.

-   **JSON:** This format includes:

    -   Top-level name/value pairs that uniquely identify the set of log entries reported in the JSON document.
    -   An object for each log entry associated with the current JSON document.
    
    [View a sample log file.](#json)
    
-   **JSON Array:** This format generates a JSON document that contains an [array of objects](#logs-array). Each object is a log entry associated with the current JSON document.
    
    [View a sample log file.](#json-array)
    
-   **JSON Lines:** This format generates an invalid JSON document that contains an object on each line. Each object is a log entry associated with the current JSON document. This object is an exact match for an object contained by the [Logs array](#logs-array).
    
    [View a sample log file.](#json-lines)
    
<Callout type="important">

  If log data uses either the JSON Array or JSON Lines log format, then it will not contain information that uniquely identifies a set of log data. If log data using one of these formats is delivered to a destination other than AWS S3, Azure Blob Storage, or Google Cloud Storage, then there is no way to check for gaps in sequence numbers when attempting to [identify missing log data](/guides/logs/rtld/log_data_verification#checking-for-sequence-number-gaps).

</Callout>

<Callout type="info">

  A log entry describes a HTTP/HTTPS request that was submitted to our CDN.

</Callout>

## Top-Level Name/Value Pairs {/*top-level-namevalue-pairs*/}

<Callout type="info">

  Top-level name/value pairs are unavailable for the JSON Array and JSON Lines log formats. If you require this information, please choose the standard JSON log format.

</Callout>

Top-level name/value pairs are described below.
  
-   **account_number (*String*):** Customer Account Number. Indicates your CDN account number (e.g., 0001). 
-   **agent_id (*String*):** Agent ID. Indicates the unique ID that identifies the Real-Time Log Delivery software agent that generated the log data.
-   **datestamp (*String*):** Date Stamp. Indicates the date on which the log data was generated.

    **Syntax:** `YYYYMMDD`

    **Example:** `20230412`

-   **logs (*Array of objects*):** Log Data. [Describes the log entries](#logs-array) associated with the current JSON document. Each object contains a set of fields that describe the request/response for a single log entry.
-   **profile_id (*Integer*):** Profile ID. Identifies a RTLD profile by its system-defined ID.
-   **seq_num (*Integer*):** Sequence Number. Indicates the sequential number that identifies the order in which the log data was generated by the software agent identified by the agent_id field.
-   **service (*String*):** Service. This field always reports `rl`.

### logs Array {/*logs-array*/}

The `logs` array contains an object for each log entry associated with the current JSON document. Each log entry describes a request to our CDN via the following fields:

-   **account_number (*String*):** Customer AN. (Category: General) Indicates your CDN account number (e.g., 0001). 
-   **client_city (*String*):** City. (Category: Client Geography) Indicates the city from which the request originated.
-   **client_country_code (*String*):** Country Code. (Category: Client Geography) Indicates the two-character ISO 3166-1 code for the country from which the request originated.
-   **client_country (*String*):** Country Name. (Category: Client Geography) Indicates the country from which the request originated.
-   **client_ip (*String*):** Client IP. (Category: Client Network) Indicates the IP address for the computer that submitted the request to our CDN.
-   **host (*String*):** Hostname. (Category: Request Header) Indicates the `Host` header value sent in the client's request to the CDN.
-   **limit_action_duration (*Integer*):** Rate Limiting Action Duration. (Category: Security Configuration) Indicates the minimum length of time, in seconds, that eligible requests were rate limited when the event took place.
-   **limit_action_percentage (*Decimal*):** Rate Limiting Action Percentage. (Category: Security Configuration) Indicates the percentage of eligible requests that were rate limited when the event took place.
-   **limit_action_type (*String*):** Rate Limiting Action Type. (Category: Security Configuration) Indicates how the rate limit was enforced on the request.
    -   **ALERT:** Alert Only
    -   **REDIRECT_302:** Redirect (HTTP 302)
    -   **CUSTOM_RESPONSE:** Custom Response
    -   **DROP_REQUEST:** Drop Request (503 Service Unavailable response with a retry-after of 10 seconds)

-   **limit_id (*String*):** Rate Limiting Action Limit ID. (Category: Security Configuration) Indicates the system-defined ID of the rate rule whose rate limit was exceeded by the request.
-   **limit_start_timestamp (*Integer*):** Rate Limiting Action Start Epoch. (Category: Security Configuration) Indicates the timestamp, in Unix time (milliseconds), at which the enforcement of the rate limit started.
-   **method (*String*):** Request Method. (Category: Security Configuration) Indicates the request's HTTP method (e.g., `GET`).
-   **referer (*String*):** Referer. (Category: Request Header) Indicates the `Referer` header value sent in the client's request to the CDN. This header reports the URL of the site from which the request originated.
-   **scope_id (*String*):** Scope ID. (Category: Security Configuration) Indicates the system-defined ID of the Security Application Manager configuration that enforced the rate limit.
-   **scope_name (*String*):** Scope Name. (Category: Security Configuration) Indicates the name of the Security Application Manager configuration that enforced the rate limit.
-   **timestamp (*Decimal*):** Timestamp. (Category: Response) Indicates the Unix time, in seconds, at which an edge server delivered the requested content to the client.

    **Syntax:** `<SECONDS>.<MICROSECONDS>`

-   **url (*String*):** URL. (Category: Request) Indicates the URL that was requested.
-   **user_agent (*String*):** User Agent. (Category: Request Header) Indicates the user agent that submitted the HTTP request to our CDN.

## Sample Log Data {/*sample-log-data*/}

Sample log data that contains two log entries is provided below for all three log formats.

<a id="json" />

```JSON
{
	"agent_id": "1234500008619D55A",
	"seq_num": 4,
	"service": "rl",
	"account_number": "0001",
	"profile_id": 1,
	"datestamp": "20210812",
	"logs": [{
			"timestamp": 1628804857.1012251,
			"account_number": "0001",
			"user_agent": "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:59.0) Gecko/20100101 Firefox/59.0",
			"url": "https://cdn.example.com/images/bunny.png",
			"client_ip": "93.113.59.253",
			"referer": "https://models.example.com/",
			"host": "cdn.example.com",
			"client_country_code": "RO",
			"client_country": "Romania",
			"client_city": "Bucharest",
			"limit_action_duration": 0,
			"limit_id": "SJuO3wey",
			"limit_action_percentage": 100,
			"limit_start_timestamp": 1628804857.167,
			"limit_action_type": "ALERT",
			"method": "GET",
			"scope_id": "dJR9RX4S",
			"scope_name": "SAM"
		}, {
			"timestamp": 1628804858.1012254,
			"account_number": "0001",
			"user_agent": "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:59.0) Gecko/20100101 Firefox/59.0",
			"url": "https://cdn.example.com/photos/sky.png",
			"client_ip": "107.190.102.233",
			"referer": "https://example2.com/",
			"host": "cdn.example.com",
			"client_country_code": "CA",
			"client_country": "Canada",
			"client_city": "Windsor",
			"limit_action_duration": 0,
			"limit_id": "SJuO3wey",
			"limit_action_percentage": 100,
			"limit_start_timestamp": 1628804832.024,
			"limit_action_type": "ALERT",
			"method": "GET",
			"scope_id": "dJR9RX4S",
			"scope_name": "SAM"
		}
	]
}
```

<a id="json-array" />

```JSON_Array
[{
		"timestamp": 1628804857.1012251,
		"account_number": "0001",
		"user_agent": "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:59.0) Gecko/20100101 Firefox/59.0",
		"url": "https://cdn.example.com/images/bunny.png",
		"client_ip": "93.113.59.253",
		"referer": "https://models.example.com/",
		"host": "cdn.example.com",
		"client_country_code": "RO",
		"client_country": "Romania",
		"client_city": "Bucharest",
		"limit_action_duration": 0,
		"limit_id": "SJuO3wey",
		"limit_action_percentage": 100,
		"limit_start_timestamp": 1628804857.167,
		"limit_action_type": "ALERT",
		"method": "GET",
		"scope_id": "dJR9RX4S",
		"scope_name": "SAM"
	}, {
		"timestamp": 1628804858.1012254,
		"account_number": "0001",
		"user_agent": "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:59.0) Gecko/20100101 Firefox/59.0",
		"url": "https://cdn.example.com/photos/sky.png",
		"client_ip": "107.190.102.233",
		"referer": "https://example2.com/",
		"host": "cdn.example.com",
		"client_country_code": "CA",
		"client_country": "Canada",
		"client_city": "Windsor",
		"limit_action_duration": 0,
		"limit_id": "SJuO3wey",
		"limit_action_percentage": 100,
		"limit_start_timestamp": 1628804832.024,
		"limit_action_type": "ALERT",
		"method": "GET",
		"scope_id": "dJR9RX4S",
		"scope_name": "SAM"
	}
]		
```
<a id="json-lines" />

```JSON_Lines
{"user_agent": "Mozilla/5.0 (Windows NT ... Represents a log entry.}
{"user_agent": "Mozilla/5.0 (Windows NT ...}
```