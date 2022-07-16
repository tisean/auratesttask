public with sharing class CaseTriggerHandler extends TriggerHandler {
    protected override void afterUpdate() {
        CaseHelper.updateAccountRatingAfterCloseCase(Trigger.new);
    }
}
