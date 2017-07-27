(function(){
	'use strict';
	var obj = [
	{
		parent1: 'child1'
	},{
		parent2: 'child2'
	},{
		parent3: 'child3'
	},
	{
		parent4: 'child4'
	},{
		parent5: 'child5'
	},{
		parent6: 'child6'
	},
	{
		parent7: 'child7'
	},{
		parent8: 'child8'
	},{
		parent9: 'child9'
	}
	];
	
	var changeCheckBoxState = function(elem,checkState){
		 var childToDisable = $(elem).data('child');
		$('.parent,#'+childToDisable).not(elem).prop('disabled', checkState);
		$('.child').not('#'+childToDisable).prop('checked', checkState);	 
	}
	
	var createTable = function(obj){
		if(obj&&obj!=null&&obj.length>0){
			var tabElem = $('<table></table>');
			for(var i=0;i<obj.length;i++){
				var tabRow = $('<tr></tr>');
				var objKey = Object.keys(obj[i])[0];
				var objVal = obj[i][objKey];
				var td1 = $('<td></td>');
				var td2 = $('<td></td>');
				var chk1 = $('<input type="checkbox"></input>').attr('value',objKey).data('child',objVal).addClass('parent');
				var chk2 = $('<input type="checkbox">').attr('value',objVal).attr('id',objVal).addClass('child');
				td1.append(chk1).append(objKey);
				td2.append(chk2).append(objVal);
				tabRow.append(td1).append(td2);
				tabElem.append(tabRow);
			}
			$('#target').append(tabElem);
			console.log(tabElem);
		}
	};
	
	createTable(obj);
	
	$(document).on('change', '.parent',function(){
		 var _this = this;
		 changeCheckBoxState(_this,$(this).is(':checked'));
	});
}
)();