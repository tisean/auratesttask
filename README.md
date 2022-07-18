# Salesforce DX Project: Aura Code Test Task - Vehicle Maintenance App

# Description:
General Setup
1. Create a new Salesforce Developer Edition (Dev org)
2. Set the IP Range on System Admin Profile: 0.0.0.0 - 255.255.255.255
# Part 1: Suppliers

When the customer service agent receives a phone call to book a maintenance check for the vehicle the agent should be able to list out all the suppliers who provide the maintenance in the city where the customer is located and check the location in a map to help the customer book an appointment.

The Suppliers are stored in an independent custom object in Salesforce.

The Object definition of the custom object is as below:
1. Field Label - Field Name -> Description.
2. Name - Name -> The name of the Supplier.
3. City - City__c -> The city in which the supplier is located.
4. Latitude - Latitude__c -> The latitude of the location of the Supplier.
5. Longitude - Longitude__c -> The Longitude of the location of the Supplier.


The customer service agent should be able to search the suppliers that are located on the Billing city of the Account starting from the Account lightning page to see a list of suppliers and then be able to drill down to each of the supplier to view the exact location on the Maps.
Make sure that the logic can work with a lot of Supplier records on the account (possibly more than 100).

# Part 2: Customer Satisfaction Rating

The customer service agent logs the satisfaction rating of the customer after the resolution of a case in a field on the Case object. The rating is logged with values between 1 and a 5. 5 being a highly satisfied customer.

The average rating of all the cases of an Account needs to be visible on a field on the Account record so that the agents have an overview of customer satisfaction.

The Average customer satisfaction rating needs to be updated on the Account on closure of each case.

Note: In your design and code take into consideration that an account can have a large number of cases logged.

Submit

Send your Dev org credentials to the contact person.

## Documentation (in short):
1. Choose Vehicle Maintenance App.
2. There are 2 users - Administrator and Customer service agent. But it would be correct to make one more user - Supplier manager. 
(He will have access only to creating and editing suppliers, without the ability to watch, change accounts and cases. 
And assign a customer to a service agent the ability to ONLY watch suppliers, without the ability to make changes or create them, leaving full access to Accounts and cases). 
3. Agent has full access to suppliers, accounts and cases. But can't change read-only fields (average Account satisfaction rating).
4. The supplier's record page shows its current position on the map.
5. On the record page of the account, there is a list of suppliers available in the city of the account is shown. (See Sergei Tit account - has a lot of Suppliers with the same city).
There is pagination on the first page, last page, previous and next page. 
Pagination buttons are interactive - they become inactive under various conditions (there are no further entries, or there are no previous entries).
There is a choice of the number of records in the table (the pagination buttons also depend - if the limits on the records are reached).
When you click on the view icon in the table row, a modal window opens with the data of this record and the position on the map is shown. 
At the bottom of the page there is a map that shows the top 10 suppliers for the current account, sorted by latitude.
6. A case is created from the account page - standard functionality. 
It would be logical to make a supplier lookup on a case so that you can choose a specific supplier, but according to the condition, the supplier object is independent. 
Therefore, the name of the supplier can be specified in the subject of the Case.
7. When creating a case, you cannot set a satisfaction rating - an error in the validation rule.
8. The satisfaction rating can (and should!) be indicated if the status of the case is closed.
If this is not the case - when trying to save the case with the Closed status - a validation error.
9. After the case is closed, the Average Account Satisfaction Rating is auto-updated. The trigger fires. Implemented trigger framework with handler and helper.
10. The Customer Service Agent does not have access to manually change the Account's Average Satisfaction Rating.
11. Tests implemented in minimal execution, no negative testing, no user testing. (But understand that it must be).
12. There are no exception handlers, try-catch-finally and so on, although there should be. And will be added in the future.
13. Custom components created with LWC. The appearance of the components was not given much attention, although I understand that this is important.

14. This project will develop further, acquiring new functionality, integration with external systems, mail notifications. 
The plans are to indicate the distance to the account in the table of suppliers on the account, sorted by this indicator - integration is needed to convert the full address into geolocation - and further recalculation of the distance.
15. To be continued... and much more to come.


# Total shorter
### The agent receives a call in order to select a supplier for service. The agent logs into the account (if a new one, he creates it with the indication of the city). On the account page, it looks at the available suppliers by the current city. Approves a case, creates it. After the case is completed, it closes with a rating for the case. Account satisfaction rating is automatically updated.


# Credentials

Link on the Org.
1. https://auracodetest-dev-ed.lightning.force.com

System admin.
1. sergeitest@aura.org
2. 2fuogykF

Customer service agent.
1. yimeya@leupus.com
2. 12345678Abc


# Thanks for your attention!
