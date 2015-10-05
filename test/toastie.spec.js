describe('Toastie controller', function() {
	var toastieController, scope, mockToast;

  beforeEach(module('toastie'));
  beforeEach(inject(function ($controller, $rootScope, $injector) {
      scope = $rootScope.$new();
      rootScope = $injector.get('$rootScope');
      
      //Create the controller with the new scope
      toastieController = $controller('ToastieController', {$scope: scope});
  }));

  it('should be defined', function() {
      expect(toastieController).toBeDefined();
  });

  it('toasts array should be defined', function() {
      expect(scope.toasts).toBeDefined();
  });

  it('on $emit should add a toast into toasts array', function() {
  		// set up
  		mockToast = {
				content: 'Toast?',
                type: 'info'
        }
	    
        var startingToasts = scope.toasts.length;

  		// act
  		rootScope.$emit("toast", mockToast)

  		// asset
      expect(scope.toasts.length).toBe(startingToasts + 1);
  });
});

describe('Toastie service', function() {
	var toastieService, scope, rootScope, mockToast;

  beforeEach(module('toastie'));
  beforeEach(inject(function(_toastieService_, $injector) {
      toastieService = _toastieService_;
      rootScope = $injector.get('$rootScope');
    	spyOn(rootScope, '$emit');
  }));

  it('should be defined', function() {
      expect(toastieService).toBeDefined();
  });

  it("should have a create method", function() {
      expect(toastieService.create).toBeDefined();
  });

  it("create method should emit something", function() {
  		// set up  		
			mockToast = {
				content: 'Toast?',
				type: 'info'
			}

  		// act
  		toastieService.create(mockToast);

  		// assert
      expect(rootScope.$emit).toHaveBeenCalled();
  });
});
