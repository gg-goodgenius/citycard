package com.example.controller.ui.workShiftPac.rv

import android.graphics.Rect
import android.view.View
import androidx.recyclerview.widget.RecyclerView



class PathsHistVerticalItemDecorator(private val verticalSpaceHeight: Int) : RecyclerView.ItemDecoration() {
    override fun getItemOffsets(
        outRect: Rect, view: View, parent: RecyclerView,
        state: RecyclerView.State
    ) {
        if (parent.getChildAdapterPosition(view) != parent.getAdapter()!!.getItemCount() - 1) {
            outRect.bottom = verticalSpaceHeight;
        }
    }
}