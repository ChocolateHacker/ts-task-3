/** Задача 3 - Моё хранилище
 *	Напишите класс хранилища(Vault)
 *	Из хранилища можно снимать валюту с помощью withdraw(Currency)
 *	В хранилище можно вкладывать валюту через deposit(Currency)
 *	Из хранлилища, можно переводить валюту через transfer(Currency, Vault)
*/
import { Currency } from "../task_1";

export class Vault implements ISecureVaultRequisites {
	public id: number;
	public store: Set<Currency> = new Set<Currency>()

	public withdraw(currency: Currency): void {
		this.store.forEach(valute => {
			if (valute.name === currency.name && valute.value >= currency.value) {
				valute.value -= currency.value;
			} else {
				throw new Error("Incorrect data");
			}
		});
	}

	public deposit(currency: Currency): void {
		let newCurrency = false;
		this.store.forEach(valute => {
			if (valute.name === currency.name) {
				valute.value += currency.value;
				newCurrency = true
			}
		});
		if (!newCurrency) {
			this.store.add(currency);
		}
	}

	public transfer(currency: Currency, vault: Vault) {
		this.withdraw(currency);
		vault.deposit(currency);
	}
}

export interface ISecureVaultRequisites {
	id: number;
	withdraw: (currency: Currency) => void;
	deposit: (currency: Currency) => void;
	transfer: (currency: Currency, vault: Vault) => void;
}
