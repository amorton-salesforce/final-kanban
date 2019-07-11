const conn = require('./salesforce/connection.js');
const nforce = require('nforce');

module.exports = function (app) {
  app.get("/", (req, res) => res.sendFile("./build/es6-unbundled/index.html"));

  app.get('/api/tasks', function (req, res) {
    const query = "SELECT Id, Assigned_Name__c, Name, Description__c, Status__c, Due_Date__c, Color__c FROM Kanban_Task__c";

    conn.query({ query }, (err, data) => {

      if (!err && data.records) {
        res.json(data.records);
      } else {
        res.json(err);
      }
    });
  });

  app.post('/api/tasks', function(req, res) {
    const record = nforce.createSObject('Kanban_Task__c');
    record.set('Assigned_Name__c', req.body.assigned_name__c);
    record.set('Name', req.body.title__c);
    record.set('Description__c', req.body.description__c);
    record.set('Status__c', req.body.status__c);
    record.set('Due_Date__c', req.body.due_date__c);
    record.set('Color__c', req.body.color__c);
  
    conn.insert({ sobject: record }, (err, resp) => {
      if(!err) {
        res.json({ success: true });
      } else {
        res.json(err);
      }
    });
  });

  app.put('/api/tasks/:id', function(req, res) {
    const record = nforce.createSObject('Kanban_Task__c');
    record.set('Id', req.params.id);
    record.set('Status__c', req.body.status__c);
  
    conn.update({ sobject: record }, (err, data) => {
      if (!err) {
        res.json({ success: true });
      } else {
        res.json(err);
      }
    });
  });
};
