@IsTest
private class CaseHelper_Test {
    @IsTest
    static void testUpdateAccountRatingAfterCloseManyCases() {
        Account ac = new Account(Name = 'Test', BillingCity = 'Brest');
        insert ac;
        List<Case> caseCreated = new List<Case>();
        for(Integer i = 0; i < 150; i++){
            Case xCase = new Case(Status = 'New', Origin = 'Phone', AccountId = ac.Id, Subject = 'Test subject-'+i);
            caseCreated.add(xCase);
        }
        insert caseCreated;
        List<Case> cases = [SELECT Id, Satisfaction_rating__c, Status FROM Case];
        List<Case> casesUpdate = new List<Case>();
        for(Case c : cases){
            c.Satisfaction_rating__c = '5';
            c.Status = 'Closed';
            casesUpdate.add(c);
        }
        Test.startTest();
        List<Database.SaveResult> results = (List<Database.SaveResult>) Database.update(casesUpdate);
        Test.stopTest();

        for(Database.SaveResult res : results){
            System.assert(res.isSuccess());
            System.assert(res.getErrors().size() == 0);
        }
        Account acC = [SELECT Id, Average_satisfaction_rating__c, (SELECT Satisfaction_rating__c, Status FROM Cases) FROM Account];
        for(Case c : acC.Cases){
            System.assertEquals('5', c.Satisfaction_rating__c);
            System.assertEquals('Closed', c.Status);
        }
        System.assertEquals(5, acC.Average_satisfaction_rating__c);
    }

}