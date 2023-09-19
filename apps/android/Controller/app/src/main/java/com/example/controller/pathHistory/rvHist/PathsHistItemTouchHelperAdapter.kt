package com.example.controller.pathHistory.rvHist



interface PathsHistItemTouchHelperAdapter {

    fun onItemMove(fromPosition: Int, toPosition: Int): Boolean

    fun onItemDismiss(position: Int)

}