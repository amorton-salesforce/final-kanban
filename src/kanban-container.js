import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/polymer/lib/elements/dom-repeat.js";
import "./status-col.js";
import "./task-card.js";

class KanbanContainer extends PolymerElement {
  static get template() {
    return html`
      <style>
        .kanban-container {
          display: grid;
          text-align: center;
          grid-template-columns: repeat(auto-fill, minmax(30vw, 1fr));
          grid-column-gap: 1em;
          padding: 70px 25px 25px;
        }
      </style>
      <div class="kanban-container">
        <status-col heading="Backlog">
          <template is="dom-repeat" items="{{tasks}}" observe="status" filter="isBacklog" sort="{{sortMethod(sort)}}">
          <task-card
            id="[[item.id]]"
            user="[[item.assigned_name__c]]"
            title="[[item.name]]"
            date="[[item.due_date__c]]"
            color="[[item.color__c]]"
          >
              <p>[[item.description__c]]</p>
            </task-card>
          </template>
        </status-col>

        <status-col heading="In Progress">
          <template is="dom-repeat" items="{{tasks}}" observe="status" filter="isInProgress" sort="{{sortMethod(sort)}}">
          <task-card
            id="[[item.id]]"
            user="[[item.assigned_name__c]]"
            title="[[item.name]]"
            date="[[item.due_date__c]]"
            color="[[item.color__c]]"
          >
              <p>[[item.description__c]]</p>
            </task-card>
          </template>
        </status-col>

        <status-col heading="Complete">
          <template is="dom-repeat" items="{{tasks}}" observe="status" filter="isComplete" sort="{{sortMethod(sort)}}">
          <task-card
            id="[[item.id]]"
            user="[[item.assigned_name__c]]"
            title="[[item.name]]"
            date="[[item.due_date__c]]"
            color="[[item.color__c]]"
          >
              <p>[[item.description__c]]</p>
            </task-card>
          </template>
        </status-col>
      </div>
    `;
  }

  static get properties() {
    return {
      tasks: Array,
      sort: String
    }
  }

  sortMethod(val) {
    if (val === "Ascending") {
      return function (a, b) {
        const date1 = new Date(a.due_date__c);
        const date2 = new Date(b.due_date__c);
        if (date1.getTime() === date2.getTime()) return 0;
        return (date1.getTime() > date2.getTime()) ? 1 : -1;
      };
    } else {
      return function (a, b) {
        const date1 = new Date(a.due_date__c);
        const date2 = new Date(b.due_date__c);
        if (date1.getTime() === date2.getTime()) return 0;
        return (date1.getTime() < date2.getTime()) ? 1 : -1;
      };
    }
  }

  isBacklog(item) {
    return item.status__c === "Backlog";
  }

  isInProgress(item) {
    return item.status__c === "In Progress";
  }

  isComplete(item) {
    return item.status__c === "Complete";
  }

  constructor() {
    super();
  }
}

customElements.define("kanban-container", KanbanContainer);
