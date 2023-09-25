import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class FilterService {

	/**
	 * @param {Object[]} list array de objetos a organizar
	 * @param {string} property
	 * @param {string} orderBy  Tipo del sort: DESC o ''
	 */
	sortByArgument(list, property, orderBy) {
		let sortOrder = 1;

		if (orderBy.indexOf('DESC') > -1) {
			sortOrder = -1;
		}

		// Special order for continuity days
		if (property == 'day_story') {
			return list.sort((a, b) => {
				return this.doSortContinuityDay(a, b, property, sortOrder);
			});
		}

		return list.sort((a, b) => {
			return this.doValidatedSort(a, b, property, sortOrder);
		})
	}

	searchByMultipleValues(list: any[], properties: string[], textToSearch: string): any[] {
		let returnList = [];
		if (textToSearch) {
			returnList = list.filter(element => {
				let aev = this.normalizeString(textToSearch.toLowerCase());
				let retItem = false;
				for (let item of properties) {
					let text = eval("element." + item);
					if (text) {
						text = text.toString()
						let a = this.normalizeString(text.toLowerCase());
						if (a.indexOf(aev) > -1) {
							retItem = true;
						}
					}

				}
				return retItem;
			});

		} else {
			returnList = list
		}
		return returnList;
	}
	searchByMultipleValuesExtended(list: any[], properties: any[], textToSearch: string): any[] {
		let returnList = [];
		if (textToSearch) {
			returnList = list.filter(element => {
				let aev = this.normalizeString(textToSearch.toLowerCase());
				let retItem = false;
				for (let item of properties) {
					if (typeof item === 'string') {
						let text = eval("element." + item);
						if (text) {
							text = text.toString()
							let a = this.normalizeString(text.toLowerCase());
							if (a.indexOf(aev) > -1) {
								retItem = true;
							}
						}
					} else { // Object {'children' and 'property'}
						if (element[item.children]) {
							for (const el of element[item.children]) {
								let text = el[item.property];
								if (text) {
									text = text.toString()
									let a = this.normalizeString(text.toLowerCase());
									if (a.indexOf(aev) > -1) {
										retItem = true;
									}
								}
							}
						}
					}

				}
				return retItem;
			});

		} else {
			returnList = list
		}
		return returnList;
	}
	tableSearchByMultipleValuesExtended(list: any[], properties: any[], textToSearch: string): any[] {
		let returnList = [];
		if (textToSearch) {
			returnList = list.filter(element => {
				let aev = this.normalizeString(textToSearch.toLowerCase());
				let retItem = false;
				for (let item of properties) {
					if (typeof item === 'string') {
						let text = eval("element.valid_value." + item);
						if (!text) {
							text = eval("element." + item);
						}
						if (text) {
							text = text.toString()
							let a = this.normalizeString(text.toLowerCase());
							if (a.indexOf(aev) > -1) {
								retItem = true;
							}
						}
					} else { // Object {'children' and 'property'}
						if (element[item.children]) {
							for (const el of element[item.children]) {
								let text = el.valid_value[item.property];
								if (text) {
									text = text.toString()
									let a = this.normalizeString(text.toLowerCase());
									if (a.indexOf(aev) > -1) {
										retItem = true;
									}
								}
							}
						}
					}

				}
				return retItem;
			});

		} else {
			returnList = list
		}
		return returnList;
	}
	searchFilter(list: any[], textToSearch: string, property: string): any[] {
		var returnList = [];
		if (textToSearch) {
			returnList = list.filter(element => {
				var text = eval("element." + property);
				if (text) {
					text = text.toString()
					var a = text.toLowerCase();
					var aev = textToSearch.toLowerCase();
					return a.indexOf(aev) > -1;
				} else {
					return false
				}

			});

		} else {
			returnList = list
		}

		return returnList;
	}
	filterBetweenNumber(list, argument, number_from, number_to) {
		var returnlist = [];
		if (number_from >= 0 || number_to >= 0) {
			for (var item of list) {
				var a = eval('item.' + argument);
				if (a) {
					if (number_from >= 0 && number_to >= 0) {
						if (a >= number_from && a <= number_to) {
							returnlist.push(item)
						}
					} else if (number_from >= 0) {
						a
						if (a >= number_from) {
							returnlist.push(item)
						}
					} else {
						if (a <= number_to) {
							returnlist.push(item)
						}
					}
				}
			}
			return returnlist;

		} else {
			return list
		}
	}
	filterRange(list, value, from, to) {
		var returnlist = [];
		if (from || to) {
			for (let item of list) {
				var returnThis = false;
				if (from && to) {
					if (parseFloat(eval("item." + value)) >= parseFloat(from) && parseFloat(eval("item." + value)) <= parseFloat(to)) {
						returnThis = true;
					}
				} else if (from) {
					if (parseFloat(eval("item." + value)) >= parseFloat(from)) {
						returnThis = true;
					}
				} else if (to) {
					parseFloat(eval("item." + value))
					if (parseFloat(eval("item." + value)) <= parseFloat(to)) {
						returnThis = true;
					}
				}
				if (returnThis) {
					returnlist.push(item)
				}
			}
		} else {
			returnlist = list;
		}
		return returnlist;
	}
	/**
	 * Usado en un mat-autocomplete cuando el array es de objetos.
	 * @param value 
	 * @param propertyToCompare 
	 * @param list 
	 */
	filterAutocompleteWithProperty(value: any, propertyToCompare: string, list: any) {
		//Quita valores nulos en caso de presentarse.
		list = list.filter(o => o[propertyToCompare] != null);

		value = (!value && value != 0) ? '' : value;
		let val = value[propertyToCompare] ? value[propertyToCompare].toString() : value.toString(); // Value puede ser un objeto o string.
		return list.filter(option => option[propertyToCompare].toString().toLowerCase().indexOf(val.toLowerCase()) === 0);
	}
	/**
	 * Usado en un mat-autocomplete cuando el array es simple.
	*/
	filterAutocompleteSimple(value: string, objs: any): string[] {
		const filterValue = value.toLowerCase();
		return objs.filter(option => option.toLowerCase().includes(filterValue));
	}

	filterElementsInListSplited(list, list_id, elements, elements_id) {
		var returnData = [];
		if (elements && elements.length > 0) {
			for (let item of list) {
				var copyItem = false;
				var a = eval('item.' + list_id)
				if (a) {
					var b = a.split(',')
					for (let obj of b) {
						for (let elm of elements) {
							var elemdata = eval('elm.' + elements_id)
							if (obj == elemdata) {
								copyItem = true;
							}
						}
					}
				}
				if (copyItem) {
					returnData.push(item);
				}
			}

		} else {
			return list
		}
		return returnData
	}

	elementInListElementsExcludeOption(list, list_id, elements, elements_id) {
		elements = elements ? elements : [];
		let newList = JSON.parse(JSON.stringify(list));
		let excludedElements = elements.filter(el => el.isExcluded);
		let notExcludedElements = elements.filter(el => !el.isExcluded);

		if (list && (elements && elements.length > 0)) {

			// Removes elements mark as "Excluded"
			if (excludedElements.length) {
				newList = newList.filter(item => {
					let exists = excludedElements.find(element => element[elements_id] == item[list_id]);
					return exists ? false : true;
				});
			}

			// Keeps elements that are not marked as "excluded"
			if (notExcludedElements.length) {
				newList = newList.filter(item => {
					let exists = notExcludedElements.find(element => element[elements_id] == item[list_id]);
					return exists ? true : false;
				});
			}

		} else {
			return list;
		}
		return newList;
	}

	elementInListElementsSplitExcludeOption(list, list_id, elements, elements_id, splitCharacter = ',') {
		elements = elements ? elements : [];
		let newList = JSON.parse(JSON.stringify(list));
		let excludedElements = elements.filter(el => el.isExcluded);
		let notExcludedElements = elements.filter(el => !el.isExcluded);

		if (list && (elements && elements.length > 0)) {

			// Removes elements mark as "Excluded"
			if (excludedElements.length) {
				newList = newList.filter(item => {
					let exists = excludedElements.find(element => {
						if (!item[list_id]) return false;
						let splitList = item[list_id].split(splitCharacter);
						return splitList.find(i => element[elements_id] == i);
					});
					return exists ? false : true;
				});
			}

			// Keeps elements that are not marked as "excluded"
			if (notExcludedElements.length) {
				newList = newList.filter(item => {
					let exists = notExcludedElements.find(element => {
						if (!item[list_id]) return false;
						let splitList = item[list_id].split(splitCharacter);
						return splitList.find(i => element[elements_id] == i);
					});
					return exists ? true : false;
				});
			}

		} else {
			return list;
		}
		return newList;
	}

	filterInMultipleSelectWithArray(list: any[], property: string, filter: any[], filter_property: string) {
		if (list) {
			let filteredList = list.filter(item => {
				for (const element of filter) {
					if (typeof element[filter_property] === 'string' && typeof item[property] === 'string') {
						if (element[filter_property].toUpperCase() == item[property].toUpperCase()) {
							return item;
						}
					} else if (element[filter_property] == item[property]) {
						return item;
					}
				}
			})
			return filteredList;
		}
		return list;
	}
	FilterDateRange(list, value, from, to) {
		var returnlist = [];
		if (from || to) {
			const FROM_DATE = this._dateP.transform(from, 'yyyy-MM-dd')
			const TO_DATE = this._dateP.transform(to, 'yyyy-MM-dd')
			for (let item of list) {
				var dateToCheck = eval("item." + value)
				if (dateToCheck) {
					var returnThis = false;
					var dateCheck = this._dateP.transform(dateToCheck, 'yyyy-MM-dd')
					if (FROM_DATE && TO_DATE) {
						if (dateCheck >= FROM_DATE && dateCheck <= TO_DATE) {
							returnThis = true;
						}
					} else if (FROM_DATE) {
						if (dateCheck >= FROM_DATE) {
							returnThis = true;
						}
					} else if (TO_DATE) {
						if (dateCheck <= TO_DATE) {
							returnThis = true;
						}
					}
					if (returnThis) {
						returnlist.push(item)
					}
				}

			}
		} else {
			returnlist = list;
		}
		return returnlist;
	}

	checkMultipleSelectActive(filters, field) {
		return filters[field.data] ? (filters[field.data].length ? true : false) : false;
	}


	sortByMultiplesArguments(list, orderBy) {
		let that = this;
		return list.sort(
			(a, b) => {
				return orderBy
					.map((o) => {
						let sortOrder = 1;
						let property = JSON.parse(JSON.stringify(o)).replace(" DESC", "");
						if (o.indexOf('DESC') > -1) {
							sortOrder = -1;
						}
						// Special order for continuity days
						if (property == 'day_story') {
							return that.doSortContinuityDay(a, b, property, sortOrder);
						}
						return that.doValidatedSort(a, b, property, sortOrder);
					})
					.reduce((p, n) => {
						return p ? p : n;
					}, 0);
			}
		);
	}

	doValidatedSort(a, b, property, sortOrder) {
		if (a[property] === null || a[property] === undefined) {
			return 1 * sortOrder;
		}
		if (b[property] === null || b[property] === undefined) {
			return -1 * sortOrder;
		}
		// Handles the rest
		let result;
		if (typeof a[property] == 'string' && typeof b[property] == 'string') {
			let valueA = Number(a[property]);
			let valueB = Number(b[property]);
			if ((valueA || valueA == 0) && (valueB || valueB == 0)) {
				result = (valueA < valueB) ? -1 : (valueA > valueB) ? 1 : 0;
			} else {
				result = (this.normalizeString(a[property].toLowerCase()) < this.normalizeString(b[property].toLowerCase())) ? -1 : (this.normalizeString(a[property].toLowerCase()) > this.normalizeString(b[property].toLowerCase())) ? 1 : 0;
			}
		} else {
			result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
		}
		return result * sortOrder;
	}


	doSortContinuityDay(a, b, property, sortOrder) {
		const NULL_LAST = true;
		if (a[property] === null || a[property] === undefined) {
			return NULL_LAST ? 1 : 1 * sortOrder;
		}
		if (b[property] === null || b[property] === undefined) {
			return NULL_LAST ? -1 : -1 * sortOrder;
		}

		let result;
		let numberA = Number(a[property]);
		let numberB = Number(b[property]);

		if ((numberA || numberA == 0) && (numberB || numberB == 0)) { //both numbers
			result = (numberA < numberB) ? -1 : (numberA > numberB) ? 1 : 0;
		} else if (!numberA && !numberB) { // both strings
			result = (this.normalizeString(a[property].toLowerCase()) < this.normalizeString(b[property].toLowerCase())) ? -1 : (this.normalizeString(a[property].toLowerCase()) > this.normalizeString(b[property].toLowerCase())) ? 1 : 0;
		} else { // one of them is string, string goes first.
			result = !numberA ? -1 : 1;
		}

		return result * sortOrder;
	}

	normalizeString(text) {
		return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
	}

	onChangeOptionsSelect(option: any, listFilters: any[], id: string = 'id') {
		let item = listFilters.find(o => o[id] == option[id]);
		if (!item) {
			return;
		}
		item.isExcluded = option.isExcluded;
	}

	setListOptionsSelect(list: any[], filterList: any[], id: string = 'id') {
		list.map(c => {
			let item = filterList.find(p => p[id] == c[id]);
			c.isExcluded = item ? (item.isExcluded ? true : false) : false;
			return c;
		});
	}

	constructor(private _dateP: DatePipe) { }
}
