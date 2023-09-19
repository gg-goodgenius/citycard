package com.example.controller.pathHistory.rvHist

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.controller.databinding.ItemPastHistBinding
import com.example.controller.entities.CardHistory
import com.example.controller.entities.Path
import java.util.Collections


class PathsHistRVAdapter() : ListAdapter<CardHistory, PathsHistViewHolder>(PathsHistDiffCallback()),
    PathsHistItemTouchHelperAdapter {

    var onPathsClickListener: ((CardHistory) -> Unit)? = null
    lateinit var hist: MutableList<CardHistory>
    lateinit var itemPathBinding: ItemPastHistBinding

    fun submit(list:  List<CardHistory>, rv: RecyclerView) {
        hist=list.toMutableList()
        submitList(list){
            rv.invalidateItemDecorations()
        }//иначе добавление нового элемента - проблема
    }

    override fun onItemDismiss(position: Int) {
        hist.removeAt(position)
        //onProjectSwipeListener?.invoke(paths[position])
        notifyItemRemoved(position)
    }

    override fun onItemMove(fromPosition: Int, toPosition: Int): Boolean {
        if (fromPosition < toPosition) {
            for (i in fromPosition until toPosition) {
                Collections.swap(hist, i, i + 1)
            }
        } else {
            for (i in fromPosition downTo toPosition + 1) {
                Collections.swap(hist, i, i - 1)
            }
        }
        notifyItemMoved(fromPosition, toPosition)
        return true
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PathsHistViewHolder {
        itemPathBinding = ItemPastHistBinding.inflate(LayoutInflater.from(parent.context), parent, false)

        return PathsHistViewHolder(itemPathBinding)
    }


    override fun onBindViewHolder(holder: PathsHistViewHolder, position: Int) {
        val item = getItem(position)
        holder.onBind(item)
        with(holder.binding) {
            containerPath.setOnClickListener() {
                //onPathsClickListener?.invoke(item)
            }


        }

    }

}