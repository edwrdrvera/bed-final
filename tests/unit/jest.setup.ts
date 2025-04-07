jest.mock("../../config/firebaseConfig", () => ({
	default: {
		collection: jest.fn(),
		runTransaction: jest.fn(),
		batch: jest.fn(),
	},
}));
