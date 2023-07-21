interface DateComponents {
	year: string;
	month: string;
	day: string;
	hour: string;
	minute: string;
}

function formatDate(date: Date, formatter: (components: DateComponents) => string) {
	return formatter({
		year: 	date.getFullYear().toString(),
		month: (date.getMonth()+1).toString(), // 0 indexed
		day:    date.getDate()    .toString(),
		hour:   date.getHours()   .toString(),
		minute: date.getMinutes() .toString(),
	});
}

function pd(num: number | string) {
	return num.toString().padStart(2, '0');
}

export {formatDate, pd};
export type {DateComponents};
