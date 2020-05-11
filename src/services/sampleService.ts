import { getSampleData } from '../models/sampleModel';

export const getSample = async () => {
	const result =  await getSampleData();

	return result;
};
