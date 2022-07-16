public with sharing class SupplierController {
    @AuraEnabled(Cacheable=true)
    public static String getAllSuppliersByCity(String city) {
        String query = 'SELECT Name, Location__Latitude__s, Location__Longitude__s, ' +
                'City__c FROM Suppliers__c WHERE City__c =: city LIMIT 10';
        return JSON.serialize(Database.query(query));
    }

    @AuraEnabled(Cacheable=true)
    public static List<Suppliers__c> getAllSuppliers(String city, Integer v_Offset, Integer v_pageSize) {
        List<Suppliers__c> suppliers = [
                SELECT Name, City__c, Location__Latitude__s, Location__Longitude__s
                FROM Suppliers__c
                WHERE City__c = :city
                LIMIT :v_pageSize
                OFFSET :v_Offset
        ];
        return suppliers;
    }

    @AuraEnabled(Cacheable=true)
    public static Integer totalRecords(String city) {
        Integer totalRec = [SELECT COUNT()
        FROM Suppliers__c
        WHERE City__c = :city];
        return totalRec;
    }
}