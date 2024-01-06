import Timer from './Timer';
import { useMemo } from 'preact/hooks';
import Dropdown from './Dropdown';
import { DateComponents, formatDate, pd } from '../DateFormat';
import useLocalStorageState from '../useLocalStorageState';

function App () {
	
	const dateFormats: ((components: DateComponents) => string)[] = useMemo(() => [
		c => `${c.month}/${c.day}/${c.year.substring(2,4)} ${c.hr12}:${pd(c.minute)} ${c.ampm}`,
		c => `${c.year}-${pd(c.month)}-${pd(c.day)} ${pd(c.hour)}:${pd(c.minute)}`,
	], []);

	const [chosenFormat, setChosenFormat] = useLocalStorageState(0, 'chosenFormat');

	const timeOptions = useMemo(() => [
		['Port Hueneme Regional', new Date('2024-02-29T07:00:00')],
		['LA Regional', new Date('2024-03-14T07:00:00')],
		['2024 FIRST Championships', new Date('2024-04-17T09:00:00')],
		['College Decision Day', new Date('2024-05-01T00:00:00')],
		['Last Day of School', new Date('2024-06-05T00:00:00')],
	] as [name: string, start: Date][], []);

	// const remainingTimeOptions = useMemo(() => timeOptions.filter(([_, date]) => date > new Date()), []);
	
	const URIchosen = useMemo(() => {
		if (typeof window === 'undefined') return undefined;
		const search = window.location.hash.substring(1);
		const index = timeOptions.findIndex(e => e[0].toLowerCase().replace(/ /g, '-') === search);
		return (index === -1) ? undefined : index
	}, []);
	
	const [chosenTime, setChosenTime] = useLocalStorageState(URIchosen ?? 0, 'chosenTime', URIchosen !== undefined);
	
	const targetTime = useMemo(() => timeOptions[chosenTime], [timeOptions, chosenTime]);
	
	const handleSetTime = (index: number) => {
		setChosenTime(index);
		window.location.hash = timeOptions[index][0].toLowerCase().replace(/ /g, '-');
	}

	return <main>
		<div class="center">
			<Timer targetTime={targetTime[1]} />
			<span class="subtitle">until</span>
			<Dropdown options={timeOptions} value={chosenTime} onInput={handleSetTime}>{(option) => (
				// <div class="option">
				// 	<div>{option[0]}</div>
				// 	<div>{formatDate(option[1], dateFormats[chosenFormat])}</div>
				// </div>
				<>
					{option[0]}{' '}
					<span class="fade">{formatDate(option[1], dateFormats[chosenFormat])}</span>
				</>
			)}</Dropdown>
		</div>
		<div class="corner">
			<Dropdown options={dateFormats} value={chosenFormat} onInput={setChosenFormat}>{(option) => (
				option({
					year: 'YYYY',
					month: 'MM',
					day: 'DD',
					hour: 'hh',
					hr12: 'hh',
					minute: 'mm',
					ampm: 'A/P'
				})
			)}</Dropdown>
		</div>
	</main>;
}

export default App;
