import { extendObservable } from 'mobx';

class Assoc {
  constructor(data) {
    this.initialState(data);
  }

  initialState(data) {
    extendObservable(this, {
      id: data.id,
      type: data.type,
      attributes: data.attributes,
      relationships: data.relationships
    });
  }

  get toMap() { 
    const newMap = [`${this.type}_${this.id}`, {
      type: this.type,
      id: this.id,
      attributes: this.attributes,
      relationships: this.relationships
    }];

    return newMap;
  }
}

export default Assoc;