from app import app, api, db, tw
from flask import Flask, render_template, jsonify, request, send_from_directory, current_app
from flask_restful import Api, Resource, reqparse
from Api.apiHandle import ControlAPI
from bson import ObjectId
import pymongo

@app.route('/', defaults={'path':''})
def Collection():
	return send_from_directory(app.static_folder, 'index.html')

api.add_resource(ControlAPI, '/')

@app.route('/profil/<id>', methods=['GET'])
def searchUser(id):
	search = db.find_one({'_id':ObjectId(id)})
	return jsonify({
		'_id':str(ObjectId(search['_id'])),
		'email' : search['email'],
		'nama' : search['nama'],
		'password' : search['password'],
		'file' : search['file']
	})

@app.route('/profil/<id>', methods=['DELETE'])
def deleteData(id):
	db.delete_one({'_id':ObjectId(id)})
	return jsonify({'message' : 'Data dihapus'})

@app.route('/profil/<id>', methods=['PUT'])
def updateData(id):
	db.update_one(
		{'_id' : ObjectId(id)}, {'$set' : {
			'email' : request.json['email'],
			'nama' : request.json['nama'],
			'password' : request.json['password'],
			'file' : request.json['file']
		}
	})	
	return jsonify({'message' : 'Data diupdate'})

@app.route('/tweet', methods=['GET'])
def tweetscrap():
	tweet = []
	for x in tw.find().sort('_id', pymongo.ASCENDING):
		tweet.append({
			'_id' : str(ObjectId(x['_id'])),
			'username' : x['USERNAME'],
			'post' : x['POSTED'],
			'tweet' : x['MESSAGE']
		})
	return jsonify(tweet)

if __name__ == '__main__':
	app.run(debug=True)

