// Always mock firebase in every test
jest.mock("../../config/firebaseConfig", () => ({
	auth: {
		verifyIdToken: jest.fn(),
		getUser: jest.fn(),
	},
	db: {
		collection: jest.fn(),
		runTransaction: jest.fn(),
		batch: jest.fn(),
	},
}));

// Reset all mocks afte each test
afterEach(() => {
	jest.clearAllMocks();
});

// Cleanup after all tests in a file
afterAll(() => {
	jest.resetModules();
});
