package com.example.controller.ui.workShiftPac.rv

import androidx.recyclerview.widget.ItemTouchHelper
import androidx.recyclerview.widget.RecyclerView
import com.example.controller.pathHistory.rvHist.PathsHistItemTouchHelperAdapter


class PathsItemTouchHelperCallback: ItemTouchHelper.Callback {

    private var mAdapter: PathsItemTouchHelperAdapter? = null

    constructor(adapter: PathsItemTouchHelperAdapter?) {
        mAdapter = adapter
    }
    override fun getMovementFlags(recyclerView: RecyclerView, viewHolder: RecyclerView.ViewHolder): Int {
        val dragFlags = ItemTouchHelper.UP or ItemTouchHelper.DOWN
        val swipeFlags = ItemTouchHelper.START or ItemTouchHelper.END
        return makeMovementFlags(dragFlags, swipeFlags)
    }

    override fun onMove(
        recyclerView: RecyclerView,
        viewHolder: RecyclerView.ViewHolder,
        target: RecyclerView.ViewHolder
    ): Boolean {
        mAdapter!!.onItemMove(viewHolder.adapterPosition, target.adapterPosition)
        return true
    }

    override fun isLongPressDragEnabled(): Boolean {
        return true
    }

    override fun isItemViewSwipeEnabled(): Boolean {
        return true
    }



    override fun onSwiped(viewHolder: RecyclerView.ViewHolder, direction: Int) {
        mAdapter!!.onItemDismiss(viewHolder.adapterPosition)
        // Log.d("SwipableRight", "onViewCreated: ")
        // onProjectSwipeListener?.invoke(viewHolder.adapterPosition)
    }


}