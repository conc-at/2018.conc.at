import '../styles/main.scss'
import 'font-awesome-webpack2'
import 'bootstrap'
import $ from 'jquery'

$(function() {
  const hash = location.hash
  $(hash)
    .modal('show')
})
