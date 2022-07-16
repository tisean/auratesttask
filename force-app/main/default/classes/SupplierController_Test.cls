@IsTest
private class SupplierController_Test {
    @TestSetup
    static void setup() {
        List<Suppliers__c> suppliers1 = new List<Suppliers__c>();
        for (Integer i = 0; i < 150; i++) {
            Suppliers__c supplier = new Suppliers__c(Name = 'Test name' + i, City__c = 'Test City',
                    Location__Longitude__s = i - 90, Location__Latitude__s = i - 90);
            suppliers1.add(supplier);
        }
        insert suppliers1;
        List<Suppliers__c> suppliers2 = new List<Suppliers__c>();
        for (Integer i = 0; i < 100; i++) {
            Suppliers__c supplier = new Suppliers__c(Name = 'Test name' + i, City__c = 'Another City',
                    Location__Longitude__s = i - 90, Location__Latitude__s = i - 90);
            suppliers2.add(supplier);
        }
        insert suppliers2;
    }
    @IsTest
    static void testTotalRecords() {
        Integer suppliersToTest1 = SupplierController.totalRecords('Test City');
        System.assertEquals(150, suppliersToTest1);
        Integer suppliersToTest2 = SupplierController.totalRecords('Another City');
        System.assertEquals(100, suppliersToTest2);
    }

    @IsTest
    static void testGetAllSuppliers() {
        List<Suppliers__c> suppliersToTest = SupplierController.getAllSuppliers('Test City', 0, 150);
        System.assertEquals(150, suppliersToTest.size());
    }

    @IsTest
    static void testGetAllSuppliersByCity() {
        String StringSuppliersToTest = SupplierController.getAllSuppliersByCity('Test City');
        System.assertEquals(true, String.isNotBlank(StringSuppliersToTest));
    }
}