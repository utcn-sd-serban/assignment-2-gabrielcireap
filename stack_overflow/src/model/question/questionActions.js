import { ADD_QUESTION } from "./questionActionTypes.js";
import { CHANGE_NEW_QUESTION_PROPERTIES } from "./questionActionTypes.js";
import { DELETE } from "./questionActionTypes.js";
import { EDIT } from "./questionActionTypes.js";
import { SEARCH_BY_TITLE } from "./questionActionTypes.js";
import { SEARCH_BY_TAG } from "./questionActionTypes.js";
import { UPVOTE } from "./questionActionTypes.js";
import { DOWNVOTE } from "./questionActionTypes.js";

export function addQuestion(user, title, text, creationDate, voteCount, tags){

	let payload = {
		user,
		title,
		text,
		creationDate,
		voteCount,
		tags
	};

	return {
		type: ADD_QUESTION,
		payload
	};
}

export function changeNewQuestionProperty(property, value){

	let payload = {
		property,
		value
	};

	return {
		type: CHANGE_NEW_QUESTION_PROPERTIES,
		payload
	};
}

export function deleteQuestion(question){

	let payload = {
		question
	};

	return {
		type: DELETE,
		payload
	};
}

export function edit(question){

	let payload = {
		question
	};

	return {
		type: EDIT,
		payload
	};
}

export function searchByTitle(title){

	let payload = {
		title
	};

	return {
		type: SEARCH_BY_TITLE,
		payload
	};
}

export function searchByTag(tag){

	let payload = {
		tag
	};

	return {
		type: SEARCH_BY_TAG,
		payload
	};
}

export function upvote(question, count){

	let payload = {
		question,
		count
	};

	return {
		type: UPVOTE,
		payload
	};
}

export function downvote(question, count, score){

	let payload = {
		question, 
		count, 
		score
	};

	return {
		type: DOWNVOTE,
		payload
	};
}