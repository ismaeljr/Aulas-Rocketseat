function onScroll() {
  if (scrollY > 0) {
    nav_menu.classlist.add('scroll')
  }else{
    nav_menu.classlist.remove('scroll')
  }
  
}
