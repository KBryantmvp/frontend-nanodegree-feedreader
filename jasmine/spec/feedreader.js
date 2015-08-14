/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This spec tests if each feed in the allFeeds object
         * has a URL defined and that the URL is not empty.
         */
        it('should have an URL for each feed', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });


        /* This spec tests if each feed in the allFeeds object
         * has a name defined and that the name is not empty.
         */
        it('should have a name for each feed', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });


    /* New test suite called 'The Menu'. This suite tests the visibility of the menu
     * element on different situations.
     */
    describe('The Menu', function() {

        /* This spec tests if the menu element is hidden by default. */
        it('is hidden by default', function() {
            expect($('body').attr('class')).toBe('menu-hidden');
        });

        /* This spec tests if the menu changes visibility when the menu icon is clicked. */
        it('changes visibility on click', function() {
            var $menu_icon = $('.menu-icon-link');

            $menu_icon.trigger('click');    // first click on the menu icon button
            expect($('body').attr('class')).not.toBe('menu-hidden'); // the menu should be visible

            $menu_icon.trigger('click');    // second click on the menu icon button
            expect($('body').attr('class')).toBe('menu-hidden'); // the menu should not be visible
        });
    });

    /* New test suite called 'Initial Entries'. It tests the asynchronous method loadFeed()*/
    describe('Initial Entries', function() {

        /* This spec tests if there is at least a single .entry element within the
         * .feed container when the loadFeed() completes its work.
         */

        /* Before the execution of the spec, we execute the async method loadFeed() to load the first feed.
         * The spec will not start until the done function is called.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('should have at least a single .entry element within the .feed container', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();     // the spec will complete when done is called
        });
    });

    /* New test suite called 'New Feed Selection'. It tests if there are actual changes in the content
     * of the feed when the loadFeed() function is called again.
     */
    describe('New Feed Selection', function() {

        /* Before the execution of the spec, we execute the async method to load the first feed.
         * The spec will not start until the done function is called.
         */

        var feedTitle;      // variable that stores the first title that loads in the header
        var newFeedTitle;   // variable that stores the new title that is loaded after beforeEach function is executed

        beforeEach(function(done) {
            // we make sure the first feed is loaded and store the header
            loadFeed(0, function() {
                feedTitle = $('.header-title').html();
                done();
            });
        });

         /* After the execution of the spec, we load the initial feed again */
        afterEach(function(done) {
            loadFeed(0, done);
        });

        it('should change content when a new feed is loaded', function(done) {
            // we load a new feed and store the new header to test it against the previous one
            loadFeed(1, function() {
                newFeedTitle = $('.header-title').html();
                expect(newFeedTitle).not.toBe(feedTitle);
                done();
            });
        });
    });
}());
