"use client"

export type TDataTeam = {
  _id: string
  teamName: string
  captain: string
  status: string
  image: string
  createdAt: string
  players: string[]
}

export type TDataHorario = {
  _id: string
  _idOne: string
  teamOne: string
  imageOne: string
  captainOne: string
  playersOne: string[]
  _idTwo: string
  teamTwo: string
  imageTwo: string
  captainTwo: string
  playersTwo: string[]
  date: string  
  hour: string
  round: number
  nro: number
  winner: string
}