import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type PrimaryTabs = 'smeta' | 'specification' | 'act' | 'lot';

export type SmetaSectionsViewType = 'tabs' | 'list';

type UserState = {
	colorMap: boolean;
	lotTab: PrimaryTabs;
	smetaSectionsView: SmetaSectionsViewType;
	// data: Api.Response.User | null;
};

const initialState: UserState = {
	colorMap: localStorage.getItem('colorMap') ? JSON.parse(localStorage.getItem('colorMap')!) : false,
	lotTab: 'lot',
	smetaSectionsView: localStorage.getItem('smetaSectionsView')
		? JSON.parse(localStorage.getItem('smetaSectionsView')!)
		: 'tabs',
};

export const optionsSlice = createSlice({
	name: 'options',
	initialState,
	reducers: {
		toggleColorMap: (state) => {
			state.colorMap = !state.colorMap;
			localStorage.setItem('colorMap', JSON.stringify(state.colorMap));
		},
		setSmetaSectionsView: (state, { payload }: PayloadAction<SmetaSectionsViewType>) => {
			state.smetaSectionsView = payload;
			localStorage.setItem('smetaSectionsView', JSON.stringify(state.smetaSectionsView));
		},
		setLotTab: (state, { payload }: PayloadAction<PrimaryTabs>) => {
			state.lotTab = payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { toggleColorMap, setLotTab, setSmetaSectionsView } = optionsSlice.actions;

export default optionsSlice.reducer;
