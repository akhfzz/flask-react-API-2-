from flask_restful import Resource, Api, reqparse
from flask import request
from app import db
from bson import ObjectId
from flask import jsonify
from werkzeug.utils import secure_filename

class ControlAPI(Resource):
	def post(self):
		data = db.insert({
			'email' : request.json['email'],
			'nama' : request.json['nama'],
			'password' : request.json['password'],
			'file' : secure_filename(request.json['file'])
		})
		return jsonify(str(ObjectId(data)))

	def get(self):
		dataList = []
		for doc in db.find():
			dataList.append({
				'_id': str(ObjectId(doc['_id'])),
				'email': doc['email'],
				'nama': doc['nama'],
				'password': doc['password'],
				'file' : doc['file']
			})
		return jsonify(dataList)