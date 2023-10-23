import dayjs from 'dayjs';

export interface TodoModel {
	done: boolean;
	content: string;
}

export interface Todo3x3Model {
	id: number;
	mainTodo: TodoModel;
	subTodos: TodoModel[];
}

export interface TodoPageModel {
	date: string;
	todos: Todo3x3Model[];
}

// ========================================
export class Todo implements TodoModel {
	done: boolean;
	content: string;

	constructor(content?: string, done?: boolean) {
		this.done = false;
		this.content = content || "";
	}
}

export class TodoPage implements TodoPageModel {
	date: string;
	todos: Todo3x3Model[];

	constructor(date: string) {
		this.date = date;
		this.todos = [
			{
				id: 0,
				mainTodo: new Todo(),
				subTodos: [new Todo()],
			},
			{
				id: 1,
				mainTodo: new Todo(),
				subTodos: [new Todo()],
			},
			{
				id: 2,
				mainTodo: new Todo(),
				subTodos: [new Todo()],
			},
		];
	}
}

export const mocktodos = {
	date: "2021-01-01",
	todos: [
		{
			id: 0,
			mainTodo: new Todo("todo1"),
			subTodos: [new Todo("sub01")],
		},
		{
			id: 1,
			mainTodo: new Todo("todo2"),
			subTodos: [],
		},
		{
			id: 2,
			mainTodo: new Todo(),
			subTodos: [new Todo(), new Todo(), new Todo()],
		},
	],
};

export const mockTodoData = [
	{
		date: "2023-10-19",
		todos: [
			{
				id: 0,
				mainTodo: new Todo("가슴운동하기", true),
				subTodos: [new Todo("머신 플라이", true), new Todo("바벨 벤치프레스", true), new Todo("딥스", true)],
			},
			{
				id: 1,
				mainTodo: new Todo("코딩테스트 공부하기!!", true),
				subTodos: [new Todo("프로그래머스 2문제 풀기", true), new Todo("블로그에 정리하기", true)],
			},
			{
				id: 2,
				mainTodo: new Todo("집청소하기 !", true),
				subTodos: [new Todo("내방 책상청소", true), new Todo("빨래", true)],
			},
		],
	},
	{
		date: "2023-10-20",
		todos: [
			{
				id: 0,
				mainTodo: new Todo("당근하고 오기", true),
				subTodos: [new Todo("12시까지 다시 포장하기", true)],
			},
			{
				id: 1,
				mainTodo: new Todo("영어공부하기", true),
				subTodos: [new Todo("토익", true), new Todo("포스트말론 노래해석하기", true)],
			},
			{
				id: 2,
				mainTodo: new Todo("수영가기", true),
				subTodos: [new Todo("6시까지 일어나기 ㅠㅠ", true)],
			},
		],
	},
	{
		date: "2023-10-21",
		todos: [
			{
				id: 0,
				mainTodo: new Todo("분리수거 하는 날 !!", true),
				subTodos: [new Todo("박스모아 버리기", true)],
			},
			{
				id: 1,
				mainTodo: new Todo("아이폰 사전예약!!", true),
				subTodos: [new Todo("쿠팡 미리 준비하기", true), new Todo("신세계 준비하기!!", true)],
			},
			{
				id: 2,
				mainTodo: new Todo("마라톤 준비하기", true),
				subTodos: [new Todo("스트레칭하기", true), new Todo("런닝머신 10km", true)],
			},
		],
	},

	{
		date: "2023-10-22",
		todos: [
			{
				id: 1,
				mainTodo: new Todo("다이소 다녀오기!", true),
				subTodos: [new Todo("매직스펀지 사오기", false), new Todo("건전지 사오기", true)],
			},
			{
				id: 2,
				mainTodo: new Todo("next 공부해보기", true),
				subTodos: [new Todo("공식 홈페이지 읽어보기", true), new Todo("블로그에 정리하기", false)],
			},
			{
				id: 3,
				mainTodo: new Todo("저녁은 집에서 해먹기", true),
				subTodos: [new Todo("퇴근하고 홈플러스가서 장보기", true)],
			},
		],
	},
] as TodoPageModel[];

export const initializeTodoData = {
	date: dayjs().format('YYYY-MM-DD'),
	todos: [
		{
			id: 0,
			mainTodo: new Todo(""),
			subTodos: [new Todo("")],
		},
		{
			id: 1,
			mainTodo: new Todo(""),
			subTodos: [new Todo("")],
		},
		{
			id: 2,
			mainTodo: new Todo(""),
			subTodos: [new Todo("")],
		},
	],
} as TodoPageModel;
