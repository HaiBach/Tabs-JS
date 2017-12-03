"use strict";
/**
 * CLASS TABSJS
 */
class TabsJS {
    constructor(selector, opts) {
        // Store the dom
        this.$tabs = this.convertNode(document.querySelectorAll(selector));
        this.$slides = this.find(this.$tabs, '.tabsjs-slides > li');
        this.$capItems = this.find(this.$tabs, '.tabsjs-caption > li');
        this.$pagItems = this.find(this.$tabs, '.tabsjs-pag > li');
        this.idCur = null;
        this.idLast = null;
        // Actived Slide first at begin
        this.ActiveSlide(0);
        // Add event on Pagination-Item
        this.EventTap(this.$pagItems);
    }
    convertNode($nodes) {
        let $nodesNew = [];
        for (let i = 0, len = $nodes.length; i < len; i++) {
            $nodesNew.push($nodes[i]);
        }
        return $nodesNew;
    }
    find($nodes, selector) {
        let $nodesNew = [];
        for (let i = 0, len = $nodes.length; i < len; i++) {
            let $nodesQuery = $nodes[i].querySelectorAll(selector);
            for (let j = 0, lenJ = $nodesQuery.length; j < lenJ; j++) {
                $nodesNew.push($nodesQuery[j]);
            }
        }
        return $nodesNew.length ? $nodesNew : null;
    }
    hasClass($node, strClass) {
        let classOnNode = $node.getAttribute('class') || '';
        return (classOnNode.indexOf(strClass) !== -1) ? true : false;
    }
    removeWS(str) {
        return str.replace(/(^\s+)|(\s+$)/g, '').replace(/(\s\s+)/g, ' ');
    }
    addClass($node, strClass) {
        let classOnNode = $node.getAttribute('class') || '';
        let arrClass = strClass.split(' ');
        for (let key in arrClass) {
            if (classOnNode.indexOf(arrClass[key]) === -1) {
                $node.setAttribute('class', this.removeWS(classOnNode + ' ' + arrClass[key]));
            }
        }
    }
    removeClass($nodes, strClass) {
        let arrClass = strClass.split(' ');
        // Convert one node to array
        if (!!$nodes.nodeType)
            $nodes = [$nodes];
        // Loop to get all node in array
        for (let i = 0, len = $nodes.length; i < len; i++) {
            let $nodeCur = $nodes[i];
            let classOnNode = $nodeCur.getAttribute('class') || '';
            // Support remove multi class
            for (let key in arrClass) {
                if (classOnNode.indexOf(arrClass[key]) !== -1) {
                    classOnNode = this.removeWS(classOnNode.replace(arrClass[key], ''));
                    classOnNode === '' ? $nodeCur.removeAttribute('class')
                        : $nodeCur.setAttribute('class', classOnNode);
                }
            }
        }
    }
    EventTap($nodes) {
        let that = this;
        // Loop to get all node in array
        for (let i = 0, len = $nodes.length; i < len; i++) {
            // // Add event 'click'
            $nodes[i].addEventListener('click', function () {
                that.ActiveSlide(i);
            });
        }
    }
    ActiveSlide(id) {
        let that = this;
        let actived = 'tabsjs-actived';
        let deactived = 'tabsjs-deactived';
        // Store id actived
        this.idLast = this.idCur;
        this.idCur = id;
        // Toggle class actived
        if (!that.hasClass(that.$pagItems[id], actived)) {
            // Remove timer & remove class at begin
            clearTimeout(this.timerDeactived);
            that.removeClass(that.$pagItems, actived);
            that.removeClass(that.$slides, actived + ' ' + deactived);
            !!that.$capItems && that.removeClass(that.$capItems, actived + ' ' + deactived);
            // Add class 'deactived' in last slide
            if (that.idLast !== null) {
                that.addClass(that.$slides[that.idLast], deactived);
                !!that.$capItems && that.addClass(that.$capItems[that.idLast], deactived);
                // Add Timer to remove 'deactived' class from slideLast
                setTimeout(function () {
                    that.removeClass(that.$slides[that.idLast], deactived);
                    !!that.$capItems && that.removeClass(that.$capItems[that.idLast], deactived);
                }, 1000);
            }
            // Add class 'actived' in slide current
            that.addClass(that.$pagItems[id], actived);
            that.addClass(that.$slides[id], actived);
            !!that.$capItems && that.addClass(that.$capItems[id], actived);
        }
    }
}
(function () {
    let $tabs = new TabsJS('[role="tabsjs"]');
})();
