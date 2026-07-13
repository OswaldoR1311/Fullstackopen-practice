import { useNoteActions } from '../store'

function FilterVisibility() {
	const { setFilter } = useNoteActions()

	return (
		<div>
			<input
				type="radio"
				name="filter"
				onChange={() => setFilter('all')}
				defaultChecked
			/>{' '}
			all
			<input
				type="radio"
				name="filter"
				onChange={() => setFilter('important')}
			/>
			important
			<input
				type="radio"
				name="filter"
				onChange={() => setFilter('nonimportant')}
			/>
			not important
		</div>
	)
}

export default FilterVisibility
