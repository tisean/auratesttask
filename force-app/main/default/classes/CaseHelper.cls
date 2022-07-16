public with sharing class CaseHelper {
    public static void updateAccountRatingAfterCloseCase(List<Case> updatedCases) {
        Set<Id> accountIds = new Set<Id>();
        for (Case caseRecord : updatedCases) {
            if (caseRecord.Status == 'Closed') {
                accountIds.add(caseRecord.AccountId);
            }
        }
        List<Account> accountsToUpdate = [
                SELECT Average_satisfaction_rating__c, (
                        SELECT Satisfaction_rating__c
                        FROM Cases
                        WHERE Status = 'Closed'
                )
                FROM Account
                WHERE Id = :accountIds
        ];
        for (Account accountRecord : accountsToUpdate) {
            Double ratingOfAccount = 0;
            for (Case caseRecordForAccountAverageRating : accountRecord.Cases) {
                ratingOfAccount += Integer.valueOf(caseRecordForAccountAverageRating.Satisfaction_rating__c);
            }
            if (accountRecord.Cases.size() > 0) {
                accountRecord.Average_satisfaction_rating__c = ratingOfAccount / accountRecord.Cases.size();
            }
        }
        update accountsToUpdate;
    }
}